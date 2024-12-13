import { IPagingParams, IPagingResponse } from '../types/paging';
import { IBrand } from './brands';
import { ProductDTO } from '@medusajs/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useLinkBrandToProduct = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: { brandId: string }) =>
      fetch(`/admin/products/${id}/brand`, {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products', id, 'brand'],
        refetchType: 'all',
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
};

export const useDismissBrandToProduct = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: { brandId: string }) =>
      fetch(`/admin/products/${id}/brand`, {
        method: 'DELETE',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products', id, 'brand'],
        refetchType: 'all',
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
};
