import { z } from 'zod';
const createClassValidation = z.object({
  trainerId: z.string({ message: 'Trainer ID is required' }),
  title: z.string({ message: 'Title is required' }),
  description: z.string({ message: 'Description is required' }),
  date: z.string({ message: 'Date is required' }),
  startTime: z.string({ message: 'Start time is required' }),
});

export const ClassValidation = {
  createClassValidation,
};
export type TClass = z.infer<typeof createClassValidation>;
