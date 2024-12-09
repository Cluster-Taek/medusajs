import { IPagingParams, IPagingResponse } from '../types/paging';
import { ProductDTO } from '@medusajs/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface IBrand extends Record<string, unknown> {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface IBrandsResponse extends IPagingResponse {
  brands: IBrand[];
}

export interface IBrandProductsResponse extends IPagingResponse {
  products: ProductDTO[];
}

export interface IBrandFormValues {
  name: string;
  description?: string;
}

export const useBrands = (params?: IPagingParams) => {
  const requestParams = new URLSearchParams(params as any).toString();
  return useQuery<IBrandsResponse>({
    queryFn: () => fetch(`/admin/brands?${requestParams}`).then((res) => res.json()),
    queryKey: ['brands', params],
  });
};

export const useBrand = (id?: string) => {
  return useQuery<IBrand>({
    queryFn: () => fetch(`/admin/brands/${id}`).then((res) => res.json()),
    queryKey: ['brands', id],
    enabled: !!id,
  });
};

export const useBrandProducts = (id?: string, params?: IPagingParams) => {
  const requestParams = new URLSearchParams(params as any).toString();
  return useQuery<IBrandProductsResponse>({
    queryFn: () => fetch(`/admin/brands/${id}/products?${requestParams}`).then((res) => res.json()),
    queryKey: ['brands', id, 'products', params],
    enabled: !!id,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: IBrandFormValues) =>
      fetch('/admin/brands', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
        refetchType: 'all',
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: { id: string } & IBrandFormValues) =>
      fetch(`/admin/brands/${value.id}`, {
        method: 'PUT',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
        refetchType: 'all',
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/admin/brands/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
        refetchType: 'all',
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
};

export const useLinkProductsToBrand = (brandId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: { productIds: string[] }) =>
      fetch(`/admin/brands/${brandId}/products`, {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands', brandId, 'products'],
        refetchType: 'all',
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
};

export const useDismissProductsToBrand = (brandId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: { productIds: string[] }) =>
      fetch(`/admin/brands/${brandId}/products`, {
        method: 'DELETE',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands', brandId, 'products'],
        refetchType: 'all',
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
};
