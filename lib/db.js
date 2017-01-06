import firebase from 'firebase'

try {
  firebase.initializeApp({
    databaseURL: 'https://rauchg-blog.firebaseio.com'
  })
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

const db = firebase.database()
export default db

