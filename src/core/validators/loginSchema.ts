import { z } from '@builder.io/qwik-city';

export const loginSchema = {
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(6, 'Password is too short'),
};
