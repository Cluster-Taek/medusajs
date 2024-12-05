import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface IBrand extends Record<string, unknown> {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface IBrandsParams {
  limit?: number;
  page?: number;
}
export interface IBrandsResponse {
  brands: IBrand[];
  count: number;
  limit: number;
  page: number;
}

export interface IBrandFormValues {
  name: string;
  description?: string;
}

export const useBrands = (params?: IBrandsParams) => {
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
