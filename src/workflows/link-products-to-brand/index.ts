import { BRAND_MODULE } from '../../modules/brand';
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils';
import { StepResponse, WorkflowResponse, createStep, createWorkflow } from '@medusajs/framework/workflows-sdk';
import BrandModuleService from 'src/modules/brand/service';

type LinkProductsToBrandStepInput = {
  productIds: string[];
  brandId: string;
};

export const linkProductsToBrandStep = createStep(
  'link-products-to-brand',
  async ({ productIds, brandId }: LinkProductsToBrandStepInput, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE);
    await brandModuleService.retrieveBrand(brandId);

    // TODO: bulk create
    productIds.forEach(async (productId) => {
      await remoteLink.create({
        [Modules.PRODUCT]: {
          product_id: productId,
        },
        [BRAND_MODULE]: {
          brand_id: brandId,
        },
      });
    });

    return new StepResponse(undefined, {
      productIds,
      brandId,
    });
  },
  async ({ productIds, brandId }, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    remoteLink.dismiss({
      [Modules.PRODUCT]: {
        product_id: productIds,
      },
      [BRAND_MODULE]: {
        brand_id: brandId,
      },
    });
  }
);

export const linkProductsToBrandWorkflow = createWorkflow(
  'link-products-to-brand',
  (input: LinkProductsToBrandStepInput) => {
    const link = linkProductsToBrandStep(input);
    return new WorkflowResponse(link);
  }
);
