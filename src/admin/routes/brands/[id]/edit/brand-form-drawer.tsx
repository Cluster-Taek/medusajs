import { useBrand, useUpdateBrand } from '../../../../lib/brands';
import { Button, Input, Label } from '@medusajs/ui';
import { Drawer } from '@medusajs/ui';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as zod from 'zod';

interface IBrandFormDrawerProps {
  id?: string;
}

const schema = zod.object({
  id: zod.string(),
  name: zod.string(),
  description: zod.string().optional(),
});

const BrandFormDrawer = ({ id }: IBrandFormDrawerProps) => {
  const navigate = useNavigate();
  const { data: brand } = useBrand(id);
  const form = useForm<zod.infer<typeof schema>>();

  const { mutate: updateBrand } = useUpdateBrand();

  const handleSubmit = form.handleSubmit(async (value) => {
    updateBrand(value, {
      onSuccess: () => {
        navigate(`/brands/${id}`);
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

  useEffect(() => {
    if (brand) {
      form.reset(brand);
    }
  }, [brand]);

  return (
    <Drawer open onOpenChange={handleOpenChange}>
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
                    name="name"
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Name
                            </Label>
                          </div>
                          <Input {...field} />
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Description
                            </Label>
                          </div>
                          <Input className="w-full" {...field} />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Footer className="gap-x-1">
              <Button variant="secondary" size="small">
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

export default BrandFormDrawer;
