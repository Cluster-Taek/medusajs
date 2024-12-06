import { z } from 'zod';

export const LinkProductToBrand = z.object({
  brandId: z.string(),
});
