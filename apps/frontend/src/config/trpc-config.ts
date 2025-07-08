import { type AppRouter } from 'backend/src/trcp/app-router';
import { createTRPCReact, createWSClient } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();

export function getBaseTrcpUrl() {
  // can change depending on env or window object
  return `http://localhost:2022/trpc`;
}

export const wsClient = createWSClient({
  url: 'ws://localhost:2022',
});