import { LinkProductToBrand } from './validators';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { linkProductToBrandWorkflow } from 'src/workflows/link-product-to-brand';
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

type LinkProductToBrandType = z.infer<typeof LinkProductToBrand>;

export const POST = async (req: MedusaRequest<LinkProductToBrandType>, res: MedusaResponse) => {
  const { result: link } = await linkProductToBrandWorkflow(req.scope).run({
    input: {
      productId: req.params.id,
      brandId: req.body.brandId,
    },
  });

  res.json({ link });
};

export const DELETE = async (req: MedusaRequest<LinkProductToBrandType>, res: MedusaResponse) => {
  const { result: link } = await linkProductToBrandWorkflow(req.scope).run({
    input: {
      productId: req.params.id,
      brandId: req.body.brandId,
    },
  });

  res.json({ link });
};
