import { StepResponse, WorkflowResponse, createStep, createWorkflow } from '@medusajs/framework/workflows-sdk';
import { BRAND_MODULE } from 'src/modules/brand';
import BrandModuleService from 'src/modules/brand/service';

export type DeleteBrandInput = {
  id: string;
};

export const deleteBrandStep = createStep(
  // step name
  'delete-brand-step',
  // step handler
  async ({ id }: DeleteBrandInput, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE);

    const brand = await brandModuleService.softDeleteBrands({
      id,
    });

    return new StepResponse(brand, brand);
  },
  // rollback when the step fails
  async (brand, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE);
    // ??
  }
);

export const deleteBrandWorkflow = createWorkflow('delete-brand', (input: DeleteBrandInput) => {
  const brand = deleteBrandStep(input);
  return new WorkflowResponse(brand);
});
