import { LinkBrandToProduct } from './validators';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { linkProductsToBrandWorkflow } from 'src/workflows/link-products-to-brand';
import { z } from 'zod';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const {
    data: [product],
  } = await query.graph({
    entity: 'product',
    fields: ['brand.*'],
    filters: {
      id: req.params.id,
    },
  });

  res.json({ brand: product.brand });
};

type LinkBrandToProductType = z.infer<typeof LinkBrandToProduct>;

export const POST = async (req: MedusaRequest<LinkBrandToProductType>, res: MedusaResponse) => {
  const { result: link } = await linkProductsToBrandWorkflow(req.scope).run({
    input: {
      productIds: [req.params.id],
      brandId: req.body.brandId,
    },
  });

  res.json({ link });
};

export const DELETE = async (req: MedusaRequest<LinkBrandToProductType>, res: MedusaResponse) => {
  const { result: link } = await linkProductsToBrandWorkflow(req.scope).run({
    input: {
      productIds: [req.params.id],
      brandId: req.body.brandId,
    },
  });

  res.json({ link });
};
