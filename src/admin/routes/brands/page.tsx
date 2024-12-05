import { BrandForm } from '../../components/brands/brand-form';
import BrandsTable from '../../components/brands/brands-table';
import { Header } from '../../components/header';
import QueryClientProvider from '../../providers/query-client-provider';
import { defineRouteConfig } from '@medusajs/admin-sdk';
import { TagSolid } from '@medusajs/icons';
import { Container } from '@medusajs/ui';

const BrandsPage = () => {
  return (
    <QueryClientProvider>
      <Container className="p-0 divide-y">
        <Header
          title="Brands"
          subtitle="This is my brands page"
          actions={[
            {
              type: 'custom',
              children: <BrandForm />,
            },
          ]}
        />
        <BrandsTable />
      </Container>
    </QueryClientProvider>
  );
};

export default BrandsPage;

export const config = defineRouteConfig({
  label: 'Brands',
  icon: TagSolid,
});
