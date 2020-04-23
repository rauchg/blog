import Skeleton from './skeleton';
import styles from './tweet-skeleton.module.css';

export default function TweetSkeleton({ simple = false }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Skeleton style={{ height: '2.25rem' }} />
        <Skeleton style={{ height: '7rem', margin: '1.25rem 0' }} />
        <Skeleton style={{ height: '1.25rem' }} />
      </div>
      {simple ? null : (
        <div className={styles.footer}>
          <Skeleton style={{ height: '1.25rem' }} />
        </div>
      )}
    </div>
  );
}
