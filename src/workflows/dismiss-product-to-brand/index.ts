import { BRAND_MODULE } from '../../modules/brand';
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils';
import { StepResponse, WorkflowResponse, createStep, createWorkflow } from '@medusajs/framework/workflows-sdk';
import BrandModuleService from 'src/modules/brand/service';

type DismissProductToBrandStepInput = {
  productId: string;
  brandId: string;
};

export const dismissProductToBrandStep = createStep(
  'dismiss-product-to-brand',
  async ({ productId, brandId }: DismissProductToBrandStepInput, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE);
    await brandModuleService.retrieveBrand(brandId);

    await remoteLink.dismiss({
      [Modules.PRODUCT]: {
        product_id: productId,
      },
      [BRAND_MODULE]: {
        brand_id: brandId,
      },
    });

    return new StepResponse(undefined, {
      productId,
      brandId,
    });
  },
  async ({ productId, brandId }, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    remoteLink.create({
      [Modules.PRODUCT]: {
        product_id: productId,
      },
      [BRAND_MODULE]: {
        brand_id: brandId,
      },
    });
  }
);

export const dismissProductToBrandWorkflow = createWorkflow(
  'dismiss-product-to-brand',
  (input: DismissProductToBrandStepInput) => {
    const link = dismissProductToBrandStep(input);
    return new WorkflowResponse(link);
  }
);
