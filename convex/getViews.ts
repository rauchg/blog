import { query } from "./_generated/server";
import commaNumber from "comma-number";

export default query(async ({ db }, postId: string): Promise<number> => {
  const counterDoc = await db
    .query("views_table")
    .filter(q => q.eq(q.field("postId"), postId))
    .first();
  return commaNumber(counterDoc?.views ?? 0);
});
