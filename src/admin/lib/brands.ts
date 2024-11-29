import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface IBrandsResponse {
  brands: {
    id: string;
    name: string;
    created_at: string;
  }[];
  count: number;
  limit: number;
  page: number;
}

export const useBrands = () => {
  return useQuery<IBrandsResponse>({
    queryFn: () => fetch('/brands').then((res) => res.json()),
    queryKey: ['brands'],
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      fetch('/brands', {
        method: 'POST',
        body: JSON.stringify({ name }),
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
