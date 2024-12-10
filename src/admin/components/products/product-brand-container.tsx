import { useProductBrand } from '../../lib/products';
import { SectionRow } from '../section-row';
import { Container, Heading } from '@medusajs/ui';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const ProductBrandWidgetContainer = () => {
  const { id } = useParams();
  const { data: brand } = useProductBrand(id);

  return (
    <Container className="p-0 divide-y">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Brand</Heading>
      </div>
      <Link to={`/brand/${brand?.id}`}>
        <SectionRow title="name" value={brand?.name} />
      </Link>
      <SectionRow title="description" value={brand?.description} />
    </Container>
  );
};

export default ProductBrandWidgetContainer;
