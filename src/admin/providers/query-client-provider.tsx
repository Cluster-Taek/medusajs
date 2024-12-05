import { QueryClientProvider as OriginQueryClientProvider, QueryClient, keepPreviousData } from '@tanstack/react-query';
import React from 'react';

interface IQueryClientProviderProps {
  children: React.ReactNode;
}

//#region Styled Component

//#endregion

const QueryClientProvider = ({ children }: IQueryClientProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
      },
    },
  });

  return <OriginQueryClientProvider client={queryClient}>{children}</OriginQueryClientProvider>;
};

export default QueryClientProvider;
