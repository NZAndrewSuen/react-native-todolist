import firebase from '../config/Firebase';
import Config from '../config/Config';

class ListService {
    constructor() {
        this.currentUser = firebase.auth().currentUser;
        const currentUserUid = this.currentUser.uid;
        let collectionPath = "/userProfile/" + currentUserUid + "/list";
        this.ref = firebase.firestore().collection(collectionPath);
    }

    getLists() {
        return this.ref;
    }

    getList(key) {
        return this.ref.doc(key);
    }

    addList(
        name,
        number,
        campus,
        isArchive = false) {
        return this.ref.add({
            name,
            number,
            campus,
            isArchive,
        });
    }

    deleteList(key) {
        return this.ref.doc(key).delete();
    }

    /*updateList(
        key,
        name,
        tag
    ) {
        let list = this.getList(key);

        return list.set({
            name,
            tag,
        })
    }*/

    updateArchive(
        key,
        name,
        isArchive
    ) {
        let list = this.getList(key);
        return list.update({
            name,
            isArchive: true,
        })
    }

    // CRUD functions related to task

    // create a task
    addTask(
        listKey,
        name,
        duetime,
        description,
    ) {
        return this.ref
            .doc(listKey)
            .collection("task").add({ name, duetime, description, isCompleted: false })
    }

    //get a list of tasks
    getTasks(listKey){
        return this.ref
        .doc(listKey)
        .collection("task")
    }

    // get a task detail
    getTask(key, listKey) {
        return this.ref
            .doc(listKey)
            .collection("task")
            .doc(key);
    }

    // update a task
    updateTask(
        key,
        listKey,
        name,
        duetime,
        description,
        isCompleted,
    ) {
        return this.ref
            .doc(listKey)
            .collection("task")
            .doc(key)
            .update({
                name: name,
                duetime: duetime,
                description: description,
                isCompleted: isCompleted
            });
    }

    updateTaskIsCompleted(
        key,
        listKey,
        isCompleted,
    ) {
        return this.ref
            .doc(listKey)
            .collection("task")
            .doc(key)
            .update({
                isCompleted: isCompleted,
            });
    }

    // delete a task
    deleteTask(key, listKey) {
        return this.ref
            .doc(listKey)
            .collection("task")
            .doc(key)
            .delete();
    }
}

export default ListService;