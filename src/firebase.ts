import firebase from 'firebase/app'
import "firebase/database"
const config = {
apiKey: 'AIzaSyCApD6wwu3krZABiF1OmVIHDxcE7Gj8P2k',
authDomain: 'norplas-clerks.firebaseapp.com',
databaseURL: 'https://norplas-clerks-default-rtdb.firebaseio.com/',
projectId: 'norplas-clerks',
storageBucket: 'norplas-clerks.appspot.com',
messagingSenderId: '992283813627',
appId: '1:992283813627:web:517fb1ec8e53915f12f25e',
measurementId:'1N6Z2HTQST'
};
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const clerksRef = databaseRef.child("clerks")
export default firebase;