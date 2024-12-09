import { Header } from '../../../components/header';
import ProductStatusBadge from '../../../components/products/product-status-badge';
import { Table } from '../../../components/table';
import { useBrandProducts, useDismissProductsToBrand } from '../../../lib/brands';
import { Plus } from '@medusajs/icons';
import { ProductDTO } from '@medusajs/types';
import { CommandBar, Container, usePrompt } from '@medusajs/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IBrandProductsContainerProps {
  id?: string;
}

const BrandProductsContainer = ({ id }: IBrandProductsContainerProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const { data } = useBrandProducts(id);
  const { mutate: dismissProductsToBrand } = useDismissProductsToBrand(id);
  const navigate = useNavigate();
  const dialog = usePrompt();

  const handleClickedEdit = () => {
    navigate(`/brands/${id}/products`);
  };

  const handleClickDelete = async () => {
    const confirmedDelete = await dialog({
      title: 'Are you sure?',
      description: `You are about to remove ${selected.length} products from the brand. This action cannot be undone.`,
      confirmText: 'Remove',
    });
    if (confirmedDelete) {
      dismissProductsToBrand(
        {
          productIds: selected,
        },
        {
          onSuccess: () => {
            setSelected([]);
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    }
  };

  return (
    <>
      <Container className="p-0 divide-y">
        <Header
          title="Product List"
          actions={[
            {
              type: 'action-menu',
              props: {
                groups: [
                  {
                    actions: [
                      {
                        icon: <Plus />,
                        label: 'Add',
                        onClick: handleClickedEdit,
                      },
                    ],
                  },
                ],
              },
            },
          ]}
        />
        <Table<ProductDTO>
          selectable
          columns={[
            {
              key: 'title',
              label: 'Product',
              width: '20%',
              render: (_value: any, item: ProductDTO) => {
                return (
                  <div className="flex h-full w-full max-w-[250px] items-center gap-x-3 overflow-hidden">
                    <div className="flex-shrink-0 w-fit">
                      <div className="bg-ui-bg-component flex items-center justify-center overflow-hidden rounded-[4px] h-8 w-6">
                        {item.thumbnail && (
                          <img src={item.thumbnail ?? ''} className="object-cover object-center w-full h-full" />
                        )}
                      </div>
                    </div>
                    <span title="Medusa Sweatpants 222" className="truncate">
                      {item.title}
                    </span>
                  </div>
                );
              },
            },
            {
              key: 'collection',
              label: 'Collection',
              render: (_value: any, item: ProductDTO) => {
                return item.collection?.title ?? '-';
              },
            },
            {
              key: 'variants',
              label: 'Variants',
              render: (_value: any, item: ProductDTO) => {
                return `${item.variants?.length ?? 0} variants`;
              },
            },
            {
              key: 'status',
              label: 'Status',
              render: (value: any) => <ProductStatusBadge status={value} />,
            },
          ]}
          data={data?.products ?? []}
          pageSize={10}
          count={data?.count ?? 0}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onSelectChange={(selected) => {
            setSelected(selected.map((s) => s.id));
          }}
        />
      </Container>
      <CommandBar open={selected.length > 0}>
        <CommandBar.Bar>
          <CommandBar.Value>{selected.length ?? 0} selected</CommandBar.Value>
          <CommandBar.Seperator />
          <CommandBar.Command action={handleClickDelete} label="Remove" shortcut="r" />
        </CommandBar.Bar>
      </CommandBar>
    </>
  );
};

export default BrandProductsContainer;
