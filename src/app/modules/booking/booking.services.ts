import httpStatus from 'http-status';
import { BookingStatus, ClassStatus } from '../../../../generated/prisma';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createBookingIntoDB = async (classId: string, userId: string) => {
  // 1. Check if the user exists and is a trainee
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { trainee: { select: { id: true, isDeleted: true } } },
  });

  if (!user?.trainee || user.trainee.isDeleted) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User is not a valid or active trainee'
    );
  }

  const traineeId = user.trainee.id;

  // 2. Fetch class with active bookings
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

  if (ClassStatus.FULL) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Class is already full. Maximum ${gymClass.maxTrainees} trainees allowed`);
  }
  if (ClassStatus.CANCELLED) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Class is cancel.`);
  }
  if (gymClass.status !== ClassStatus.ACTIVE) {

    throw new ApiError(httpStatus.BAD_REQUEST, 'Class is not active');
  }

  // 3. Check if class is full
  if (gymClass.bookings.length >= gymClass.maxTrainees) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Class is full (Max ${gymClass.maxTrainees} trainees)`
    );
  }

  // 4. Prevent duplicate bookings
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
      'You have already booked this class'
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
      `Time conflict with another class: ${title} (${startTime} - ${endTime})`
    );
  }

  // 6. Proceed with booking and transaction
  return await prisma.$transaction(async tx => {
    const booking = await tx.booking.create({
      data: {
        classId,
        traineeId,
        status: BookingStatus.CONFIRMED,
      },
      include: {
        class: {
          select: { title: true, date: true, startTime: true, endTime: true, trainer:true },
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



// const cancelBooking = async (bookingId: string, traineeId: string) => {
//   // 1. Verify booking exists and belongs to this trainee
//   const booking = await prisma.booking.findUnique({
//     where: { id: bookingId },
//     include: { class: true }
//   });

//   if (!booking) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
//   }

//   if (booking.traineeId !== traineeId) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'You can only cancel your own bookings');
//   }

//   if (booking.status === 'CANCELLED') {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Booking is already cancelled');
//   }

//   // 2. Check if cancellation is allowed (e.g., not too close to class time)
//   const now = new Date();
//   const classTime = new Date(booking.class.date);
//   const hoursUntilClass = (classTime.getTime() - now.getTime()) / (1000 * 60 * 60);

//   if (hoursUntilClass < 24) {
//     throw new ApiError(httpStatus.BAD_REQUEST,
//       'Cancellations must be made at least 24 hours before class');
//   }

//   // 3. Cancel the booking
//   return await prisma.$transaction(async (tx) => {
//     const cancelledBooking = await tx.booking.update({
//       where: { id: bookingId },
//       data: { status: 'CANCELLED' }
//     });

//     // 4. If class was FULL, reopen it
//     // if (booking.class.status === 'FULL') {
//     //   await tx.class.update({
//     //     where: { id: booking.class.id },
//     //     data: { status: 'ACTIVE' }
//     //   });
//     // }

//     return cancelledBooking;
//   });
// };

export const BookingService = {
  createBookingIntoDB
  //   cancelBooking
};
