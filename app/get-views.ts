import convexConfig from "@/convex.json";

export const getViews = async () => {
  const url = new URL(`${convexConfig.prodUrl}/api/0.1.4/udf`);
  url.searchParams.append("path", "getAllViews");
  url.searchParams.append("args", "[]");
  const res = await fetch(url);
  return res.json().then(data => data.value);
};
