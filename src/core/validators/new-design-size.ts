import { z } from '@builder.io/qwik-city';

export const newDesignSizeSchema = {
  width: z.preprocess(
    (num) => Number(num),
    z
      .number()
      .int('Must be an integer')
      .positive('Must be positive')
      .min(50, 'Must be at least 50')
      .max(100_000, 'Must be at maximun 100.000')
      .transform((num) => num.toString()),
  ),
  height: z.preprocess(
    (t) => Number(t),
    z
      .number()
      .int('Must be an integer')
      .positive('Must be positive')
      .min(50, 'Must be at least 50')
      .max(100_000, 'Must be at maximun 100.000')
      .transform((num) => num.toString()),
  ),
};
