import Image from "next/image";
import styles from "./tweet-header.module.css";

export default function TweetHeader({ tweet }) {
  const url = `https://twitter.com/${tweet.username}`;
  const avatar = tweet.avatar.normal;

  return (
    <div className={styles.header}>
      <a
        href={url}
        className={styles.avatar}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className={styles.rounded}
          src={avatar}
          alt={tweet.name}
          height={36}
          width={36}
        />
      </a>
      <a
        href={url}
        className={styles.author}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.name} title={tweet.name}>
          {tweet.name}
        </span>
        <span className={styles.username} title={`@${tweet.username}`}>
          @{tweet.username}
        </span>
      </a>
      <a
        href={url}
        className={styles.brand}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className={styles["icon-twitter"]}
          title="View on Twitter"
          role="img"
        />
      </a>
    </div>
  );
}
