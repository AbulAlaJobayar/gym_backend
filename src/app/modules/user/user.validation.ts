import { z } from 'zod';
const createUser = z.object({
  firstName: z.string({ message: 'First name is required' }),
  lastName: z.string({ message: 'Last name is required' }),
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Email is not valid' }),
  password: z.string({ message: 'Password is required' }),
});

export const UserValidation = {
  createUser,
};
export type TUser = z.infer<typeof createUser>;
