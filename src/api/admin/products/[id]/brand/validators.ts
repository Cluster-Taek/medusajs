import { z } from 'zod';

export const LinkBrandToProduct = z.object({
  brandId: z.string(),
});
