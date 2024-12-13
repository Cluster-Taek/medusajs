import { BRAND_MODULE } from '../../modules/brand';
import { ContainerRegistrationKeys, Modules, promiseAll } from '@medusajs/framework/utils';
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
    const query = container.resolve(ContainerRegistrationKeys.QUERY);

    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE);
    await brandModuleService.retrieveBrand(brandId);

    const previousLinks: { brandId: string; productId: string }[] = [];

    // https://docs.medusajs.com/learn/fundamentals/workflows/compensation-function#handle-errors-in-loops
    try {
      const productModuleService = container.resolve(Modules.PRODUCT);
      await promiseAll(
        productIds.map(async (productId) => {
          await productModuleService.retrieveProduct(productId);
          const {
            data: [product],
          } = await query.graph({
            entity: 'product',
            fields: ['brand.*'],
            filters: {
              id: productId,
            },
          });
          if (product.brand) {
            previousLinks.push({
              brandId: product.brand.id,
              productId,
            });
            await remoteLink.dismiss({
              [Modules.PRODUCT]: {
                product_id: productId,
              },
              [BRAND_MODULE]: {
                brand_id: product.brand.id,
              },
            });
          }
        })
      );
    } catch (error) {
      return StepResponse.permanentFailure(error.message);
    }

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

    return new StepResponse(undefined, {
      productIds,
      brandId,
      previousLinks,
    });
  },
  async ({ productIds, brandId, previousLinks }, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
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
    await remoteLink.create(
      previousLinks.map(({ productId, brandId }) => ({
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

export const linkProductsToBrandWorkflow = createWorkflow(
  'link-products-to-brand',
  (input: LinkProductsToBrandStepInput) => {
    const link = linkProductsToBrandStep(input);
    return new WorkflowResponse(link);
  }
);
