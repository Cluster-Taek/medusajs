import { SingleColumnLayout } from '../../../../layouts/single-column';
import QueryClientProvider from '../../../../providers/query-client-provider';
import BrandDetailContainer from '../brand-detail-container';
import BrandProductsContainer from '../brand-products-container';
import { BrandProductFocusModal } from './brand-product-focus-modal';
import { defineRouteConfig } from '@medusajs/admin-sdk';
import { TagSolid } from '@medusajs/icons';
import { useParams } from 'react-router';

const BrandsPage = () => {
  const { id } = useParams();

  return (
    <QueryClientProvider>
      <SingleColumnLayout>
        <BrandDetailContainer id={id} />
        <BrandProductsContainer id={id} />
        <BrandProductFocusModal id={id} />
      </SingleColumnLayout>
    </QueryClientProvider>
  );
};

export default BrandsPage;

export const config = defineRouteConfig({
  label: 'Brands',
  icon: TagSolid,
});
