import { greetingRouter } from './routes/greeting-router';
import { postRouter } from './routes/post-router';
import { initTRPC } from '@trpc/server';
import { Context } from 'vm';

const t = initTRPC.context<Context>().create();

export const { router } = t;

export const publicProcedure = t.procedure;

// Merge routers together
export const appRouter = router({
  greeting: greetingRouter,
  post: postRouter
});

export type AppRouter = typeof appRouter;
