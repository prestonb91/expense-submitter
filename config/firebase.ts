import * as firebase from 'firebase';
import Env from "./env";

firebase.initializeApp({
    apiKey: Env['FIREBASE_API_KEY'],
    authDomain: Env['FIREBASE_AUTH_DOMAIN'],
    databaseURL: Env['FIREBASE_DATABASE_URL'],
    projectId: Env['FIREBASE_PROJECT_ID'],
    storageBucket: Env['FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: Env['FIREBASE_MESSAGING_SENDER_ID']
  });
  export default firebase;
