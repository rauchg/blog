import convexConfig from "@/convex.json";

export const getViews = async () => {
  const url = new URL(`${convexConfig.prodUrl}/api/0.1.4/udf`);
  url.searchParams.append("path", "getAllViews");
  url.searchParams.append("args", "[]");
  const res = await fetch(url.toString());
  const data = await res.json().then(data => data.value);
  return data;
};
