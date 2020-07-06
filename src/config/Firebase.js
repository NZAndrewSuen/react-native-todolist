import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {/*timestampsInSnapshots: true*/ };

const config = {
    apiKey: "AIzaSyDAo3Cq_sikBn0UROfiQxKioHkGHcrX4VY",
    authDomain: "my-to-do-react-native.firebaseapp.com",
    databaseURL: "https://my-to-do-react-native.firebaseio.com",
    projectId: "my-to-do-react-native",
    storageBucket: "my-to-do-react-native.appspot.com",
    messagingSenderId: "740748536660",
    appId: "1:740748536660:web:cacfea93411df29b"
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;