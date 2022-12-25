import { mutation } from "./_generated/server";

export default mutation(async ({ db }, authToken: string, postId: string) => {
  let authDoc = await db.query("auth_table").first();
  if (authDoc?.token == null || authDoc.token != authToken) {
    throw new Error("Unauthorized");
  }

  let viewsDoc = await db
    .query("views_table")
    .filter(q => q.eq(q.field("postId"), postId))
    .first();

  if (viewsDoc === null) {
    db.insert("views_table", { postId, views: 1 });
  } else {
    viewsDoc.views++;
    db.replace(viewsDoc._id, viewsDoc);
  }
});
