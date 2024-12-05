import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { BRAND_MODULE } from 'src/modules/brand';
import BrandModuleService from 'src/modules/brand/service';
import { deleteBrandWorkflow } from 'src/workflows/delete-brand';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const brandModuleService: BrandModuleService = req.scope.resolve(BRAND_MODULE);

  const brand = await brandModuleService.retrieveBrand(req.params.id);

  res.json(brand);
}

export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  const brandModuleService: BrandModuleService = req.scope.resolve(BRAND_MODULE);

  const brand = await brandModuleService.updateBrands(req.body);

  res.json(brand);
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const { result } = await deleteBrandWorkflow(req.scope).run({
    input: {
      id: req.params.id,
    },
  });

  res.json({
    result,
  });
}
