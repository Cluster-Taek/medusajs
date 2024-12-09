import { z } from 'zod';

export const LinkBrandToProduct = z.object({
  brandId: z.string(),
});

export const DismissBrandToProduct = z.object({
  brandIds: z.array(z.string()),
});
