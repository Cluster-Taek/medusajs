import Brand from './models/brand';
import { MedusaService } from '@medusajs/framework/utils';

class BrandModuleService extends MedusaService({
  Brand,
}) {}

export default BrandModuleService;
