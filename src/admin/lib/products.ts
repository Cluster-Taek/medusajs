import { IPagingParams, IPagingResponse } from '../types/paging';
import { IBrand } from './brands';
import { ProductDTO } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';

export interface IProductsResponse extends IPagingResponse {
  products: ProductDTO[];
}

export const useProductBrand = (id?: string) => {
  return useQuery<IBrand>({
    queryFn: () => fetch(`/admin/products/${id}/brand`).then((res) => res.json()),
    queryKey: ['products', id, 'brand'],
    enabled: !!id,
  });
};

export const useProducts = (params?: IPagingParams) => {
  const requestParams = new URLSearchParams(params as any).toString();
  return useQuery<IProductsResponse>({
    queryFn: () => fetch(`/admin/products?${requestParams}`).then((res) => res.json()),
    queryKey: ['products', params],
  });
};
