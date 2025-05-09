import httpStatus from 'http-status';
import { BookingStatus, ClassStatus } from '../../../../generated/prisma';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createBookingIntoDB = async (classId: string, userId: string) => {
  //  Check if the user exists and is a trainee
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { trainee: { select: { id: true, isDeleted: true } } },
  });

  if (!user?.trainee || user.trainee.isDeleted) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User is not a valid or active trainee',
    );
  }

  const traineeId = user.trainee.id;

  //  Fetch class with active bookings
  const gymClass = await prisma.class.findUnique({
    where: { id: classId },
    include: {
      bookings: {
        where: { status: { not: BookingStatus.CANCELLED } },
        select: { id: true },
      },
    },
  });

  if (!gymClass) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }

  if (gymClass.status !== ClassStatus.ACTIVE) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Class schedule is full. Maximum 10 trainees allowed per schedule',
    );
  }

  // Check if class is full
  if (gymClass.bookings.length >= gymClass.maxTrainees) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Class is full (Max ${gymClass.maxTrainees} trainees)`,
    );
  }

  //  duplicate bookings
  const existingBooking = await prisma.booking.findFirst({
    where: {
      classId,
      traineeId,
      status: { not: BookingStatus.CANCELLED },
    },
  });

  if (existingBooking) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'You have already booked this class',
    );
  }

  // 5. Time conflict check
  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      traineeId,
      status: BookingStatus.CONFIRMED,
      class: {
        date: gymClass.date,
        startTime: { lt: gymClass.endTime },
        endTime: { gt: gymClass.startTime },
      },
    },
    include: {
      class: {
        select: { title: true, startTime: true, endTime: true },
      },
    },
  });

  if (conflictingBooking) {
    const { title, startTime, endTime } = conflictingBooking.class;
    throw new ApiError(
      httpStatus.CONFLICT,
      `Time conflict with another class: ${title} (${startTime} - ${endTime})`,
    );
  }

  // Proceed with booking and transaction
  return await prisma.$transaction(async tx => {
    const booking = await tx.booking.create({
      data: {
        classId,
        traineeId,
        status: BookingStatus.CONFIRMED,
      },
      include: {
        class: {
          select: {
            title: true,
            date: true,
            startTime: true,
            endTime: true,
            trainer: true,
          },
        },
        trainee: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
    });

    const totalActiveBookings = await tx.booking.count({
      where: {
        classId,
        status: { not: BookingStatus.CANCELLED },
      },
    });

    if (totalActiveBookings >= gymClass.maxTrainees) {
      await tx.class.update({
        where: { id: classId },
        data: { status: ClassStatus.FULL },
      });
    }

    return booking;
  });
};
const getBookingFromTrainee = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      trainee: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await prisma.booking.findMany({
    where: { traineeId: user.trainee?.id },
    select: {
      id: true,
      class: {
        select: {
          title: true,
          description: true,
          startTime: true,
          endTime: true,
          date: true,
          status: true,
          trainer: true,
          createdAt: true,
        },
      },
      trainee: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};
const cancelBookingFromDB = async (bookingId: string, userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      trainee: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const traineeId = user.trainee?.id;
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { class: true },
  });

  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  if (booking.traineeId !== traineeId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You can only cancel your own bookings',
    );
  }

  if (booking.status === 'CANCELLED') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking is already cancelled');
  }

  //  Check if cancellation is allowed (e.g., not too close to class time)
  const now = new Date();
  const classTime = new Date(booking.class.date);
  const hoursUntilClass =
    (classTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilClass < 24) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Cancellations must be made at least 24 hours before class',
    );
  }

  // Cancel the booking
  return await prisma.$transaction(async tx => {
    const cancelledBooking = await tx.booking.update({
      where: { id: bookingId },
      data: { status: BookingStatus.CANCELLED },
    });

    // 4. If class was FULL, reopen it
    if (booking.class.status === 'FULL') {
      await tx.class.update({
        where: { id: booking.class.id },
        data: { status: ClassStatus.ACTIVE },
      });
    }

    return cancelledBooking;
  });
};
export const BookingService = {
  createBookingIntoDB,
  getBookingFromTrainee,
  cancelBookingFromDB,
};
