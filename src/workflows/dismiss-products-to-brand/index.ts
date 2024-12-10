import { BRAND_MODULE } from '../../modules/brand';
import { ContainerRegistrationKeys, Modules, promiseAll } from '@medusajs/framework/utils';
import { StepResponse, WorkflowResponse, createStep, createWorkflow } from '@medusajs/framework/workflows-sdk';
import BrandModuleService from 'src/modules/brand/service';

type DismissProductsToBrandStepInput = {
  productIds: string[];
  brandId: string;
};

export const dismissProductsToBrandStep = createStep(
  'dismiss-products-to-brand',
  async ({ productIds, brandId }: DismissProductsToBrandStepInput, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE);
    await brandModuleService.retrieveBrand(brandId);

    // https://docs.medusajs.com/learn/fundamentals/workflows/compensation-function#handle-errors-in-loops
    try {
      const productModuleService = container.resolve(Modules.PRODUCT);
      await promiseAll(
        productIds.map(async (productId) => {
          await productModuleService.retrieveProduct(productId);
        })
      );
    } catch (error) {
      return StepResponse.permanentFailure(error.message);
    }

    await remoteLink.dismiss(
      productIds.map((productId) => ({
        [Modules.PRODUCT]: {
          product_id: productId,
        },
        [BRAND_MODULE]: {
          brand_id: brandId,
        },
      }))
    );

    return new StepResponse(undefined, {
      productIds,
      brandId,
    });
  },
  async ({ productIds, brandId }, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    await remoteLink.create(
      productIds.map((productId) => ({
        [Modules.PRODUCT]: {
          product_id: productId,
        },
        [BRAND_MODULE]: {
          brand_id: brandId,
        },
      }))
    );
  }
);

export const dismissProductsToBrandWorkflow = createWorkflow(
  'dismiss-products-to-brand',
  (input: DismissProductsToBrandStepInput) => {
    const link = dismissProductsToBrandStep(input);
    return new WorkflowResponse(link);
  }
);
