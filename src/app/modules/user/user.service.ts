import { Request } from 'express';
import { hashedPassword } from './user.utils';

import ApiError from '../../../errors/ApiError';
import { ENUM_USER_ROLE } from '../../../enums/user';
import prisma from '../../../shared/prisma';
import { Prisma } from '@prisma/client';
import { TUser } from './user.validation';

const createAdminIntoDB = async (req: Request) => {
  const { email, password, firstName, lastName } = req.body as TUser;
  if (!email || !password || !firstName || !lastName) {
    throw new ApiError(
      400,
      'All fields (email, password, firstName, lastName) are required',
    );
  }
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, 'Email already exists');
  }

  // Hash the password
  const hashPassword = await hashedPassword(req.body.password);

  const result = await prisma.$transaction(
    async (transactionClient: Prisma.TransactionClient) => {
      // Create User
      const createUser = await transactionClient.user.create({
        data: {
          email: email,
          password: hashPassword,
          role: ENUM_USER_ROLE.ADMIN,
        },
      });
      // Create Admin
      const createAdmin = await transactionClient.admin.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });
      const { password: _, ...userWithoutPassword } = createUser;
      return { ...createAdmin, ...userWithoutPassword };
    },
  );

  return result;
};
const createTrainerIntoDB = async (req: Request) => {
  const { email, password, firstName, lastName } = req.body as TUser;
  if (!email || !password || !firstName || !lastName) {
    throw new ApiError(
      400,
      'All fields (email, password, firstName, lastName) are required',
    );
  }
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, 'Email already exists');
  }

  // Hash the password
  const hashPassword = await hashedPassword(req.body.password);

  const result = await prisma.$transaction(
    async (transactionClient: Prisma.TransactionClient) => {
      // Create User
      const createUser = await transactionClient.user.create({
        data: {
          email: email,
          password: hashPassword,
          role: ENUM_USER_ROLE.TRAINER,
        },
      });
      // Create Trainer
      const createTrainer = await transactionClient.trainer.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });
      const { password: _, ...userWithoutPassword } = createUser;
      return { ...createTrainer, ...userWithoutPassword };
    },
  );

  return result;
};
const createTraineeIntoDB = async (req: Request) => {
  const { email, password, firstName, lastName } = req.body as TUser;
  if (!email || !password || !firstName || !lastName) {
    throw new ApiError(
      400,
      'All fields (email, password, firstName, lastName) are required',
    );
  }
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, 'Email already exists');
  }

  // Hash the password
  const hashPassword = await hashedPassword(req.body.password);

  const result = await prisma.$transaction(
    async (transactionClient: Prisma.TransactionClient) => {
      // Create User
      const createUser = await transactionClient.user.create({
        data: {
          email: email,
          password: hashPassword,
          role: ENUM_USER_ROLE.TRAINEE,
        },
      });
      // Create Trainee
      const createTrainee = await transactionClient.trainee.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });
      const { password: _, ...userWithoutPassword } = createUser;
      return { ...createTrainee, ...userWithoutPassword };
    },
  );

  return result;
};
const getAllTrainersFromDB = async () => {
  const trainers = await prisma.trainer.findMany({
    include: {
      user: {
        select: {
          email: true,
          role: true,
        },
      },
    },
  });
  return trainers;
};

export const UserServices = {
  createAdminIntoDB,
  createTrainerIntoDB,
  createTraineeIntoDB,
  getAllTrainersFromDB,
};
