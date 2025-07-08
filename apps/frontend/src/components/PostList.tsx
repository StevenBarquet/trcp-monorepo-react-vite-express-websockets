import { trpc } from 'src/config/trpc-config';
import styles from './components.module.css';

export function PostList() {
  const subscription = trpc.post.postSubscription.useSubscription();
  console.log({ subscription: subscription.data });
  return (
    <div className={styles.PostList}>
      <ol>
        {subscription.data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
