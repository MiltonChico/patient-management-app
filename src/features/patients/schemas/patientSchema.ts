import { z } from 'zod';

export const patientSchema = z.object({
  name: z
    .string()
    .min(2, 'Name should contain 2 characters at least')
    .max(100, 'Name is too long'),
  avatar: z
    .string()
    .min(1, 'Avatar Url is required')
    .url('Url must be valid'),
  description: z
    .string()
    .min(10, 'Description should contain 10 characters at least')
    .max(500, 'Description is too long'),
  website: z
    .string()
    .min(1, 'Website Url is required')
    .url('Url must be valid'),
});

export type PatientFormSchema = z.infer<typeof patientSchema>;