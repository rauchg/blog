export const config = {
  runtime: "experimental-edge",
};

export default async function view(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const initial = url.searchParams.get("initial") === "1";

  if (!id) {
    return res.status(400).json({
      error: 'Missing "id" query parameter',
    });
  }

  const { result: total } = await fetch(
    `https://global-apt-bear-30602.upstash.io/${
      initial
        ? // we make views noop during development
          process.env.NODE_ENV === "production"
          ? "incr"
          : "get"
        : "get"
    }/${id}`,
    {
      headers: {
        authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    }
  ).then(res => res.json());

  return Response.json({
    total,
  });
}
