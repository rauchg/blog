import Image from "next/image";
import s from "./tweet-header.module.css";

async function updateTwitterDP(username, setAvatar) {
  const response = await fetch(`/api/update-dp?username=${username}`);
  const data = await response.json();
  setAvatar(data.src);
}

export default function TweetHeader({ tweet }) {
  const url = `https://twitter.com/${tweet.username}`;
  const [avatar, setAvatar] = useState(tweet.avatar.normal);

  return (
    <div className={s.header}>
      <a
        href={url}
        className={s.avatar}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={avatar} alt={tweet.name} width={36} height={36} onError={async () => {await updateTwitterDP(tweet.username, setAvatar)}} />
      </a>
      <a
        href={url}
        className={s.author}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={s.name} title={tweet.name}>
          {tweet.name}
        </span>
        <span className={s.username} title={`@${tweet.username}`}>
          @{tweet.username}
        </span>
      </a>
      <a
        href={url}
        className={s.brand}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className={`icon ${s.twitterIcon}`}
          title="View on Twitter"
          role="img"
        />
      </a>
    </div>
  );
}
