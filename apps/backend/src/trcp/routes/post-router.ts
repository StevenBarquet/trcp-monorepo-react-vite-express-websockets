import { z } from 'zod';
import { publicProcedure, router } from '../app-router';
import { observable } from '@trpc/server/observable';

export const postRouter = router({
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        text: z.string()
      })
    )
    .mutation(({ input }) => {
      // imagine db call here
      return {
        id: `${Math.random()}`,
        ...input
      };
    }),
  randomNumber: publicProcedure.subscription(() => {
    return observable<{ randomNumber: number }>((emit) => {
      const timer = setInterval(() => {
        // emits a number every second
        emit.next({ randomNumber: Math.random() });
      }, 200);

      return () => {
        clearInterval(timer);
      };
    });
  })
});
