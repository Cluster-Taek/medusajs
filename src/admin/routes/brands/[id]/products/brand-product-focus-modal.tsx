import ProductStatusBadge from '../../../../components/products/product-status-badge';
import { Table } from '../../../../components/table';
import { useBrandProducts, useLinkProductsToBrand } from '../../../../lib/brands';
import { useProducts } from '../../../../lib/products';
import { ProductDTO } from '@medusajs/types';
import { Button, FocusModal } from '@medusajs/ui';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as zod from 'zod';

interface IBrandProductFocusModalProps {
  id?: string;
}

const schema = zod.object({
  productIds: zod.array(zod.string()),
});

export const BrandProductFocusModal = ({ id }: IBrandProductFocusModalProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const form = useForm<zod.infer<typeof schema>>();
  const navigate = useNavigate();

  const { data } = useProducts();
  const { data: brandProductsResponse } = useBrandProducts(id);
  const { mutate: linkProductsToBrand } = useLinkProductsToBrand(id);

  const handleSubmit = form.handleSubmit(async (value) => {
    linkProductsToBrand(value, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate(`/brands/${id}`);
    }
  };

  return (
    <FocusModal open onOpenChange={handleOpenChange}>
      <FocusModal.Content>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
            <FocusModal.Header>
              <div className="flex items-center justify-end gap-x-2">
                <FocusModal.Close asChild>
                  <Button size="small" variant="secondary">
                    Cancel
                  </Button>
                </FocusModal.Close>
                <Button type="submit" size="small">
                  Save
                </Button>
              </div>
            </FocusModal.Header>

            <FocusModal.Body>
              <Controller
                control={form.control}
                name="productIds"
                render={({ field }) => {
                  return (
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
                                      <img
                                        src={item.thumbnail ?? ''}
                                        className="object-cover object-center w-full h-full"
                                      />
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
                      defaultSelected={brandProductsResponse?.products ?? []}
                      onSelectChange={(selected) => {
                        field.onChange(selected.map((s) => s.id));
                      }}
                    />
                  );
                }}
              />
            </FocusModal.Body>
            <FocusModal.Footer></FocusModal.Footer>
          </form>
        </FormProvider>
      </FocusModal.Content>
    </FocusModal>
  );
};
