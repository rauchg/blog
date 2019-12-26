const admin = require("firebase-admin");
const { join } = require("path");
const cert = join(__dirname, "../service-account.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
    }),
    databaseURL: "https://rauchg-blog.firebaseio.com"
  });
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    throw err;
  }
}

module.exports = admin.database();
