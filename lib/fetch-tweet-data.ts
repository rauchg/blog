import { getJSON, set } from "@/lib/store";
import { fetchTweetAst } from "static-tweets";

export async function fetchTweetData(id: string) {
  let t = await getJSON(`/tweets/${id}.json`);
  if (t == null) {
    t = await fetchTweetAst(id);
    if (t == null) throw new Error(`Could not fetch tweet ${id}`);
    await set(`/tweets/${id}.json`, JSON.stringify(t));
  }
  return t;
}
