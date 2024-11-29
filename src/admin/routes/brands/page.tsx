import { BrandForm } from '../../components/brands/brand-form';
import BrandsTable from '../../components/brands/brands-table';
import { Header } from '../../components/header';
import { defineRouteConfig } from '@medusajs/admin-sdk';
import { TagSolid } from '@medusajs/icons';
import { Container } from '@medusajs/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const BrandsPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container className="divide-y p-0">
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
