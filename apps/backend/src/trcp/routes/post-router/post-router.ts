import { z } from 'zod';
import { publicProcedure, router } from '../../init';
import { observable } from '@trpc/server/observable';
import { Post, PostsObservable } from './data';

const postObservable = new PostsObservable();

export const postRouter = router({
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        text: z.string(),
      }),
    )
    .mutation(({ input }) => {
      // imagine db call here

      const item = {
        id: `${Math.floor(Math.random() * 1000000)}`,
        ...input,
      };

      postObservable.addPost(item);

      return item;
    }),

  // Subscription to get updated posts
  postSubscription: publicProcedure.subscription(() => {
    return observable<Post[] | undefined, any>((emit) => {
      // Subscribe to postObservable (different from trcp subscription)
      const unsubscribe = postObservable.subscribe((updatedPosts) => {
        emit.next(updatedPosts);
      });

      // Cancel subscription
      return () => {
        unsubscribe();
      };
    });
  }),
});
