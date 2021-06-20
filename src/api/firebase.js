const firebaseConfig = {
    apiKey: "AIzaSyAEqwiCAQbrV1kc0MzIO3U6bl_sqJiO9Yc",
    authDomain: "bill-splitter-2eb38.firebaseapp.com",
    projectId: "bill-splitter-2eb38",
    storageBucket: "bill-splitter-2eb38.appspot.com",
    messagingSenderId: "911100952329",
    appId: "1:911100952329:web:bdc1dfd31b7729e767ddd8"
};

let app;
if (firebase.apps.length == 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();

export default db; 