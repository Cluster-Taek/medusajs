import BrandModule from '../modules/brand';
import { defineLink } from '@medusajs/framework/utils';
import ProductModule from '@medusajs/medusa/product';

export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  BrandModule.linkable.brand,
  {
    database: {
      table: 'product_brands',
    },
  }
);
