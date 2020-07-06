import firebase from '../config/Firebase';
import Config from "../config/Config";

import {
  GoogleSignin,
  statusCodes,
} from 'react-native-google-signin';

class UserService {
  constructor() {
    this.currentUser = firebase.auth().currentUser;
    GoogleSignin.configure(Config.GoogleSigninConfig);
  }

  // get current user email
  getCurrentUsername() {
    let email  = this.currentUser.email;
    let username = email.substring(0, email.indexOf("@"));
    return username;
  }

  //register new user
  async signUpUser(email, password, uid, firstName = "") {
    // sign up normally
    if (uid == null) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((newUserCredential) => {
          //also create new record in doc userProfile
          firebase
            .firestore()
            .doc(`/userProfile/${newUserCredential.user.uid}`) //template strings
            .set({ email });
        })
        .catch(error => {
          throw new Error(error);
        });
    }
    // login google
    else {
      //also create new record in doc userProfile
      firebase
        .firestore()
        .doc(`/userProfile/${uid}`)
        // .set({ email, firstName });
        .set({ email });
    }
  }

  //login normally
  loginUser(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //login google
  async loginUserViaGoogle() {
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken); // Login with the credential

      return firebase
        .auth()
        .signInWithCredential(credential);
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  }

  //log out user
  async logoutUser() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    catch (err) {
      // TODO: rfl
    }

    return firebase.auth().signOut();
  }

  //reset password
  resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }
}

export default UserService;