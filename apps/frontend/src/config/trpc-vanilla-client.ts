import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { type AppRouter } from 'backend/src/trcp/app-router';
import { getBaseTrcpUrl } from './trpc-config';


export const vanillaTRPC = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: getBaseTrcpUrl(),
      headers: () => {
        const headers = new Headers();
        headers.set('x-trpc-source', 'nextjs-react');
        return headers;
      },
    }),
  ],
});