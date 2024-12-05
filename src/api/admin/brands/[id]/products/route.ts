import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';

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
