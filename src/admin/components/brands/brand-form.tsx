import { useCreateBrand } from '../../lib/brands';
import { Button, FocusModal, Heading, Input, Label } from '@medusajs/ui';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';

const schema = zod.object({
  name: zod.string(),
});

export const BrandForm = () => {
  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      name: '',
    },
  });

  const { mutate: createBrand } = useCreateBrand();

  const handleSubmit = form.handleSubmit(async ({ name }) => {
    createBrand(name, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  });

  return (
    <FocusModal>
      <FocusModal.Trigger asChild>
        <Button type="button" size="small">
          Create
        </Button>
      </FocusModal.Trigger>
      <FocusModal.Content>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="flex h-full flex-col overflow-hidden">
            <FocusModal.Header />

            <FocusModal.Body>
              <div className="flex flex-1 flex-col items-center overflow-y-auto">
                <div className="mx-auto flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16">
                  <div>
                    <Heading className="capitalize">Brand</Heading>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      control={form.control}
                      name="name"
                      rules={{ required: 'Name is required' }}
                      render={({ field }) => {
                        return (
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-x-1">
                              <Label size="small" weight="plus">
                                Title
                              </Label>
                            </div>
                            <Input {...field} />
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </FocusModal.Body>
            <FocusModal.Footer>
              <div className="flex items-center justify-end gap-x-2">
                <FocusModal.Close asChild>
                  <Button size="small" variant="secondary">
                    Cancel
                  </Button>
                </FocusModal.Close>
                <FocusModal.Close asChild>
                  <Button type="submit" size="small">
                    Save
                  </Button>
                </FocusModal.Close>
              </div>
            </FocusModal.Footer>
          </form>
        </FormProvider>
      </FocusModal.Content>
    </FocusModal>
  );
};
