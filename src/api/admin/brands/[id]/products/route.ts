import { LinkProductsToBrand } from './validators';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { dismissProductsToBrandWorkflow } from 'src/workflows/dismiss-products-to-brand';
import { linkProductsToBrandWorkflow } from 'src/workflows/link-products-to-brand';
import { z } from 'zod';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const page = req.query.page ? Number(req.query.page) : 0;

  const {
    data: [brand],
    metadata,
  } = await query.graph({
    entity: 'brand',
    fields: ['products.*'],
    filters: {
      id: req.params.id,
    },
    pagination: {
      take: limit,
      skip: page * limit,
      order: {
        created_at: 'DESC',
      },
    },
  });

  res.json({
    products: brand.products,
    count: metadata.count,
    limit,
    page,
  });
};

type LinkProductsToBrand = z.infer<typeof LinkProductsToBrand>;

export const POST = async (req: MedusaRequest<LinkProductsToBrand>, res: MedusaResponse) => {
  const { result: link, errors } = await linkProductsToBrandWorkflow(req.scope).run({
    input: {
      brandId: req.params.id,
      productIds: req.body.productIds,
    },
    throwOnError: false,
  });

  if (errors.length) {
    return res.send({
      errors: errors.map((error) => error.error.message),
    });
  }

  res.json({ link });
};

export const DELETE = async (req: MedusaRequest<LinkProductsToBrand>, res: MedusaResponse) => {
  const { result: link, errors } = await dismissProductsToBrandWorkflow(req.scope).run({
    input: {
      brandId: req.params.id,
      productIds: req.body.productIds,
    },
    throwOnError: false,
  });

  if (errors.length) {
    return res.send({
      errors: errors.map((error) => error.error.message),
    });
  }

  res.json({ link });
};
