'use client';

import { QueryClient, QueryClientProvider } from "react-query";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
