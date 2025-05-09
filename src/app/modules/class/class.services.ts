import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { TClass } from './class.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';

const createNewClassIntoDB = async (payload: TClass) => {
  // 1. Validate trainer exists
  const trainer = await prisma.trainer.findUnique({
    where: { id: payload.trainerId },
  });
  if (!trainer) {
    throw new ApiError(404, 'Trainer not found.');
  }

  // 2. Normalize class date
  const classDate = new Date(payload.date);
  classDate.setHours(0, 0, 0, 0);

  // 3. Convert start time (AM/PM) to 24-hour DateTime
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

  // 4. Check for time conflicts (overlapping classes)
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

  // 5. Enforce max 5 classes/day
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

  // 6. Create the class
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
       role:ENUM_USER_ROLE.TRAINER
    },
    select:{
        trainer:true
    }
  });
  console.log(ifTrainerExist)
  if (!ifTrainerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trainer Not Found');
  }
  const getMyClass = await prisma.class.findMany({
    where: {
      trainerId:ifTrainerExist.trainer?.id,
    },
    orderBy:{
        date:"asc"
    }
  });
  if(!getMyClass){
    throw new ApiError(httpStatus.NOT_FOUND," you have Not any class right now")
  }
  
  return getMyClass
};

export const ClassService = {
  createNewClassIntoDB,
  getMyClassFromDB
};
