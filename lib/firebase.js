import { initializeApp, getApp } from "firebase/app";
import { getDatabase as getDb } from "firebase/database";

export function getDatabase() {
  let app;
  try {
    app = getApp();
  } catch (err) {
    // an error is thrown when the db is not initialized
    app = initializeApp({
      databaseURL: "https://rauchg-blog.firebaseio.com",
    });
  }
  return getDb(app);
}
