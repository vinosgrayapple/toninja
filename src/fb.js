import firebase from 'firebase/app'
import 'firebase/firestore'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDSCu_EMb7qcl3iumUii-neCTB46LgPh7k",
    authDomain: "todo-ninja-a5e96.firebaseapp.com",
    databaseURL: "https://todo-ninja-a5e96.firebaseio.com",
    projectId: "todo-ninja-a5e96",
    storageBucket: "todo-ninja-a5e96.appspot.com",
    messagingSenderId: "1031859773141"
};
firebase.initializeApp(config);
const db = firebase.firestore()
/* db.settings({
    timestampsInSnapshots: true
}) */
export default db