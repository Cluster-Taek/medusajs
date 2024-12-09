import { ProductStatus } from '@medusajs/types';
import { StatusBadge } from '@medusajs/ui';

interface IProductStatusBadgeProps {
  status: ProductStatus;
}

//#region Styled Component

//#endregion

const ProductStatusBadge = ({ status }: IProductStatusBadgeProps) => {
  if (status === 'draft')
    return (
      <StatusBadge className="bg-transparent border-none" color="grey">
        Draft
      </StatusBadge>
    );
  if (status === 'published')
    return (
      <StatusBadge className="bg-transparent border-none" color="green">
        Published
      </StatusBadge>
    );
  if (status === 'proposed')
    return (
      <StatusBadge className="bg-transparent border-none" color="grey">
        Proposed
      </StatusBadge>
    );
  if (status === 'rejected')
    return (
      <StatusBadge className="bg-transparent border-none" color="red">
        Rejected
      </StatusBadge>
    );
};

export default ProductStatusBadge;
