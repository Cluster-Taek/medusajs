import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { BRAND_MODULE } from 'src/modules/brand';
import BrandModuleService from 'src/modules/brand/service';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const brandModuleService: BrandModuleService = req.scope.resolve(BRAND_MODULE);

  const brand = await brandModuleService.retrieveBrand(req.params.id);

  res.json(brand);
}
