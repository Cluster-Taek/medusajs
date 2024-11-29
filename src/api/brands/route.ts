import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { BRAND_MODULE } from 'src/modules/brand';
import BrandModuleService from 'src/modules/brand/service';
import { createBrandWorkflow } from 'src/workflows/create-brand';

interface CreateBrandInput {
  name: string;
}

export async function POST(req: MedusaRequest<CreateBrandInput>, res: MedusaResponse) {
  const { result: post } = await createBrandWorkflow(req.scope).run({
    input: {
      name: req.body.name,
    },
  });

  res.json({
    post,
  });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const brandModuleService: BrandModuleService = req.scope.resolve(BRAND_MODULE);

  const limit = req.query.limit || 15;
  const page = req.query.page || 0;

  const [brands, count] = await brandModuleService.listAndCountBrands(
    {},
    {
      skip: page as number,
      take: limit as number,
    }
  );

  res.json({
    brands,
    count,
    limit,
    page,
  });
}
