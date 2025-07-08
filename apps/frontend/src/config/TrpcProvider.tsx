import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, wsLink } from '@trpc/client';
import React, { useState } from 'react';
import { getBaseTrcpUrl, trpc, wsClient } from './trpc-config';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        wsLink({
          client: wsClient,
        }),
        httpBatchLink({
          url: getBaseTrcpUrl(),
          // You can pass any HTTP headers you wish here
          headers: () => {
            const headers = new Headers();
            headers.set('x-trpc-source', 'nextjs-react');
            // headers.set('authorization', getAuthCookie());
            return headers;
          },
        }),
       
      ]
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
