import { z } from 'zod';

export const LinkProductsToBrand = z.object({
  productIds: z.array(z.string()),
});
