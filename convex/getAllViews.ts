import { query } from "./_generated/server";
import commaNumber from "comma-number";

export default query(async ({ db }): Promise<object> => {
  const counterDocs = await db.query("views_table").collect();
  return counterDocs.map(doc => {
    return {
      ...doc,
      views: doc.views,
      viewsFormatted: commaNumber(doc.views),
    };
  });
});
