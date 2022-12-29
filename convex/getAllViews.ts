import { query } from "./_generated/server";
import commaNumber from "comma-number";

export interface View {
  postId: string;
  views: number;
  viewsFormatted: string;
}

export default query(async ({ db }): Promise<Array<View>> => {
  const counterDocs = await db.query("views_table").collect();
  return counterDocs.map(doc => {
    return {
      ...doc,
      viewsFormatted: commaNumber(doc.views),
    };
  });
});
