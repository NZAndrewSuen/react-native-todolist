import firebase from '../config/Firebase';

class ProfileService {
    constructor() {
        this.currentUser = firebase.auth().currentUser;
        const currentUserUid = this.currentUser.uid;
        let collectionPath = "/userProfile/" + currentUserUid + "/profile";
        this.ref = firebase.firestore().collection(collectionPath);
    }

    getProfile() {
        return this.ref;
    }

    addProfile(
        studentId,
        name,
        major,
    ) {
        return this.ref.add({
            studentId,
            name,
            major,
        })
    }

}

export default ProfileService