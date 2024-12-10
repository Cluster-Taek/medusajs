import ProductBrandWidgetContainer from '../components/products/product-brand-container';
import QueryClientProvider from '../providers/query-client-provider';
import { defineWidgetConfig } from '@medusajs/admin-sdk';

const ProductBrandWidget = () => {
  return (
    <QueryClientProvider>
      <ProductBrandWidgetContainer />
    </QueryClientProvider>
  );
};

export const config = defineWidgetConfig({
  zone: 'product.details.side.before',
});

export default ProductBrandWidget;
