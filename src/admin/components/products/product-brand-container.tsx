import { useProductBrand } from '../../lib/products';
import { Header } from '../header';
import { SectionRow } from '../section-row';
import ProductBrandFormDrawer from './product-brand-form-drawer';
import { Pencil } from '@medusajs/icons';
import { Container } from '@medusajs/ui';
import { useState } from 'react';
import { useParams } from 'react-router';

const ProductBrandWidgetContainer = () => {
  const { id } = useParams();
  const { data: brand } = useProductBrand(id);
  const [open, setOpen] = useState(false);

  const handleClickedEdit = () => {
    setOpen(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <>
      <Container className="p-0 divide-y">
        <Header
          title="Brand"
          actions={[
            {
              type: 'action-menu',
              props: {
                groups: [
                  {
                    actions: [
                      {
                        icon: <Pencil />,
                        label: 'Edit',
                        onClick: handleClickedEdit,
                      },
                    ],
                  },
                ],
              },
            },
          ]}
        />
        <SectionRow title="name" value={brand?.name} />
        <SectionRow title="description" value={brand?.description} />
      </Container>
      <ProductBrandFormDrawer id={id} open={open} handleOpenChange={handleOpenChange} />
    </>
  );
};

export default ProductBrandWidgetContainer;
