function getContainerClassName(dataType) {
  if (!dataType) return;

  const [type, count] = dataType.split(' ');

  switch (type) {
    case 'image-container':
      return `image-container image-count-${count}`;
    case 'gif-container':
    case 'video-container':
      return type;
  }
}

export default {
  div(props, components, i) {
    const { data } = props;
    const type = props.dataType || (data && data.type);

    if (type === 'tweet') {
      const { Tweet } = components;
      return (
        <Tweet key={i} data={data}>
          {props.children}
        </Tweet>
      );
    }

    if (type === 'poll-container') {
      const { Poll } = components;
      return <Poll key={i} data={data} />;
    }

    const Div = components.div;
    const className = getContainerClassName(type);

    return (
      <Div key={i} className={className} data={data}>
        {props.children}
      </Div>
    );
  },
  img(props, components, i) {
    const type = props.dataType;

    if (type === 'emoji-for-text') {
      const { Emoji } = components;
      return <Emoji key={i} src={props.src} alt={props.alt} />;
    }

    if (type === 'media-image') {
      const Img = components.img;
      return <Img key={i} src={props.src} alt={props.alt} />;
    }

    return null;
  },
  a(props, components, i) {
    const type = props.dataType;

    if (type === 'mention') {
      const { Mention } = components;
      return <Mention key={i} href={props.href} children={props.children} />;
    }

    if (type === 'hashtag') {
      const { Hashtag } = components;
      return <Hashtag key={i} href={props.href} children={props.children} />;
    }

    if (type === 'cashtag') {
      const { Cashtag } = components;
      return <Cashtag key={i} href={props.href} children={props.children} />;
    }

    if (type === 'quote-tweet') {
      const { EmbeddedTweet } = components;
      return <EmbeddedTweet key={i} href={props.href} />;
    }

    const A = components.a;
    return (
      <A key={i} href={props.href} title={props.title}>
        {props.children}
      </A>
    );
  },
  blockquote(props, components, i) {
    if (process.env.NEXT_PUBLIC_TWITTER_LOAD_WIDGETS === 'true') {
      const isEmbeddedTweet = props.className?.includes('twitter-tweet');

      if (isEmbeddedTweet) {
        const { EmbeddedTweet } = components;
        return <EmbeddedTweet {...props} />;
      }
    } else {
      const ast = props.data?.ast;

      if (ast) {
        const { EmbeddedTweet } = components;
        return <EmbeddedTweet key={i} ast={ast[0]} />;
      }
    }

    const Blockquote = components.blockquote;
    return <Blockquote key={i} children={props.children} />;
  },
};
