import { z } from 'zod';
import { publicProcedure, router } from '../app-router';

export const greetingRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .query(({ input }) => `Hello, ${input.name}!`)
});
