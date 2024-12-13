import { useBrands } from '../../lib/brands';
import { useDismissBrandToProduct, useLinkBrandToProduct, useProductBrand } from '../../lib/products';
import { Button, Label, Select } from '@medusajs/ui';
import { Drawer } from '@medusajs/ui';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';

interface IProductBrandFormDrawerProps {
  id?: string;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
}

const schema = zod.object({
  id: zod.string(),
  brandId: zod.string(),
});

const ProductBrandFormDrawer = ({ id, open, handleOpenChange }: IProductBrandFormDrawerProps) => {
  const { data: currentBrand } = useProductBrand(id);
  const { data: brands } = useBrands();
  const form = useForm<zod.infer<typeof schema>>();
  const { mutateAsync: linkBrandToProduct } = useLinkBrandToProduct(id);
  const { mutateAsync: dismissBrandToProduct } = useDismissBrandToProduct(id);

  const handleSubmit = form.handleSubmit(async (value) => {
    if (value.brandId === 'undefined') {
      if (!currentBrand) return;
      await dismissBrandToProduct(
        {
          brandId: currentBrand?.id,
        },
        {
          onSuccess: () => {
            form.reset();
            handleOpenChange(false);
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    } else {
      await linkBrandToProduct(value, {
        onSuccess: () => {
          form.reset();
          handleOpenChange(false);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  });

  useEffect(() => {
    form.reset({
      brandId: currentBrand?.id,
    });
  }, [currentBrand]);

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <Drawer.Content>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
            <Drawer.Header>
              <Drawer.Title>Edit Brand</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <div className="mx-auto flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-4">
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="brandId"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Brand{' '}
                              <span className="font-sans font-normal txt-compact-small text-ui-fg-muted">
                                (Optional)
                              </span>
                            </Label>
                          </div>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <Select.Trigger>
                              <Select.Value placeholder="Select a brand" />
                            </Select.Trigger>
                            <Select.Content>
                              <Select.Item value={'undefined'}>
                                <span className="text-ui-fg-muted">No brand</span>
                              </Select.Item>
                              {brands?.brands.map((item) => (
                                <Select.Item key={item.id} value={item.id}>
                                  {item.name}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Footer className="gap-x-1">
              <Button onClick={() => handleOpenChange(false)} variant="secondary" size="small">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="small">
                Save
              </Button>
            </Drawer.Footer>
          </form>
        </FormProvider>
      </Drawer.Content>
    </Drawer>
  );
};

export default ProductBrandFormDrawer;
