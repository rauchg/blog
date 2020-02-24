import Node from './node';

export default function PostsNav({ tweets, date }) {
  const { data } = tweets[0];
  const navAst = {
    tag: 'div',
    data: {
      ...data,
      date,
      isNav: true,
    },
  };

  return <Node node={navAst} />;
}
