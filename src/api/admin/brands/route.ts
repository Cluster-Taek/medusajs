import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { BRAND_MODULE } from 'src/modules/brand';
import BrandModuleService from 'src/modules/brand/service';
import { createBrandWorkflow } from 'src/workflows/create-brand';
import { deleteBrandWorkflow } from 'src/workflows/delete-brand';

interface CreateBrandInput {
  name: string;
  description?: string;
}

export async function POST(req: MedusaRequest<CreateBrandInput>, res: MedusaResponse) {
  const { result: brand } = await createBrandWorkflow(req.scope).run({
    input: {
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.json({
    brand,
  });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const brandModuleService: BrandModuleService = req.scope.resolve(BRAND_MODULE);

  const limit = Number(req.query.limit) ?? 10;
  const page = Number(req.query.page) ?? 0;

  const [brands, count] = await brandModuleService.listAndCountBrands(
    {},
    {
      take: limit,
      skip: page * limit,
      order: {
        created_at: 'DESC',
      },
    }
  );

  res.json({
    brands,
    count,
    limit,
    page,
  });
}
