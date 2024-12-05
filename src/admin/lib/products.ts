import { IBrand } from './brands';
import { useQuery } from '@tanstack/react-query';

export const useProductBrand = (id?: string) => {
  return useQuery<IBrand>({
    queryFn: () => fetch(`/admin/products/${id}/brand`).then((res) => res.json()),
    queryKey: ['products', id, 'brand'],
    enabled: !!id,
  });
};
