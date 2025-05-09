import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { TClass } from './class.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import paginationHelper, { TOption } from '../../../helpers/paginationHelper';
import { ClassStatus, Prisma } from '../../../../generated/prisma';

const createNewClassIntoDB = async (payload: TClass) => {
  //  Validate trainer exists
  const trainer = await prisma.trainer.findUnique({
    where: { id: payload.trainerId },
  });
  if (!trainer) {
    throw new ApiError(404, 'Trainer not found.');
  }

  //  Normalize class date
  const classDate = new Date(payload.date);
  classDate.setHours(0, 0, 0, 0);

  //  Convert start time (AM/PM) to 24-hour DateTime
  const [timeStr, period] = payload.startTime.split(' ');
  const [hourStr, minuteStr] = timeStr.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (period === 'PM' && hour < 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  const startDateTime = new Date(classDate);
  startDateTime.setHours(hour, minute, 0, 0);

  const endDateTime = new Date(startDateTime);
  endDateTime.setHours(endDateTime.getHours() + 2);

  //  Check for time conflicts (overlapping classes)
  const conflictingClass = await prisma.class.findFirst({
    where: {
      trainerId: payload.trainerId,
      OR: [
        {
          startTime: { lte: startDateTime },
          endTime: { gt: startDateTime },
        },
        {
          startTime: { lt: endDateTime },
          endTime: { gte: endDateTime },
        },
        {
          startTime: { gte: startDateTime },
          endTime: { lte: endDateTime },
        },
      ],
    },
  });

  if (conflictingClass) {
    const formattedStart = formatTime(conflictingClass.startTime);
    const formattedEnd = formatTime(conflictingClass.endTime);
    throw new ApiError(
      400,
      `Trainer already has a class during ${formattedStart} - ${formattedEnd}`,
    );
  }

  //  Enforce max 5 classes/day
  const nextDay = new Date(classDate);
  nextDay.setDate(classDate.getDate() + 1);

  const dailyCount = await prisma.class.count({
    where: {
      trainerId: payload.trainerId,
      date: {
        gte: classDate,
        lt: nextDay,
      },
    },
  });

  if (dailyCount >= 5) {
    throw new ApiError(400, 'Maximum of 5 classes per day reached.');
  }

  // Create the class
  const newClass = await prisma.class.create({
    data: {
      title: payload.title,
      description: payload.description,
      trainerId: payload.trainerId,
      date: classDate,
      startTime: startDateTime,
      endTime: endDateTime,
    },
  });

  return {
    ...newClass,
    startTime: formatTime(startDateTime),
    endTime: formatTime(endDateTime),
  };
};

// Utility function to format Date to AM/PM
const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes} ${ampm}`;
};

const getMyClassFromDB = async (id: string) => {
  const ifTrainerExist = await prisma.user.findFirst({
    where: {
      id,
      role: ENUM_USER_ROLE.TRAINER,
    },
    select: {
      trainer: true,
    },
  });

  if (!ifTrainerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trainer Not Found');
  }
  const getMyClass = await prisma.class.findMany({
    where: {
      trainerId: ifTrainerExist.trainer?.id,
    },
    orderBy: {
      date: 'asc',
    },
  });
  if (!getMyClass) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      ' you have Not any class right now',
    );
  }

  return getMyClass;
};

const getAllClassFromDB = async (query: any, options: TOption) => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelper(options);

  const { searchTerm, ...filterData } = query;

  // convert string to boolean
  if (filterData.availability && filterData.availability === 'false') {
    filterData.availability = false;
  }

  if (filterData.availability && filterData.availability === 'true') {
    filterData.availability = true;
  }

  const andCondition: Prisma.ClassWhereInput[] = [];
  if (query.searchTerm) {
    andCondition.push({
      OR: ['title', 'description', 'status'].map(field => ({
        [field]: {
          contains: query.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.ClassWhereInput = { AND: andCondition };
  const result = await prisma.class.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    select: {
      id: true,
      title: true,
      description: true,
      startTime: true,
      endTime: true,
      date: true,
      createdAt: true,
      updatedAt: true,
      status: true,
      trainer: true,
      bookings: true,
    },
  });
  const total = await prisma.class.count({
    where: whereCondition,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getSingleClassFromDB = async (id: string) => {
  const result = await prisma.class.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      bookings: true,
      startTime: true,
      endTime: true,
      date: true,
      status: true,
      trainer: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
const updateClassIntoDB = async (id: string, payload: Partial<TClass>) => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Id not found please provide Id');
  }
  const result = await prisma.$transaction(async tx => {
    const existingClass = await tx.class.findUnique({ where: { id } });

    if (!existingClass) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
    }

    // Perform the update
    return tx.class.update({
      where: { id },
      data: payload,
    });
  });

  return result;
};
const deleteClassFromDB = async (id: string) => {
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Valid class ID is required');
  }
  const result = await prisma.$transaction(async tx => {
    const existingClass = await tx.class.findUnique({
      where: { id },
      include: {
        bookings: true,
      },
    });
    if (!existingClass) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
    }
    if (existingClass.bookings?.length > 0) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'Cannot delete class with enrolled students',
      );
    }
    return tx.class.delete({
      where: { id },
    });
  });
  return result;
};
const availableClassFromDB = async () => {
  const result = await prisma.class.findMany({
    where: { status: ClassStatus.ACTIVE },
  });
  return result;
};

export const ClassService = {
  createNewClassIntoDB,
  getMyClassFromDB,
  getAllClassFromDB,
  getSingleClassFromDB,
  updateClassIntoDB,
  deleteClassFromDB,
  availableClassFromDB,
};
