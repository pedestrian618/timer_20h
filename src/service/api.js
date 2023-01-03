import { getFirestore,serverTimestamp } from "firebase/firestore";
import { collection, addDoc,deleteDoc,getDoc,getDocs,query,where,orderBy,doc,updateDoc } from "firebase/firestore";
import { db } from "./firebase";


export const initGet = async(uid) => {
    const q = query(collection(db,"todo"),orderBy("createdAt","desc"),where("uid", "==" ,uid))
    const todo = await getDocs(q);
    console.log(todo)

    let todos = [];
    todo.forEach(doc => {
        todos.push({
            id:doc.id,
            content: doc.data().content,
            isComplete:doc.data().isComplete,
            timeSecond: doc.data().timeSecond,
        })
    })
    return todos;
    /*
    return todo.get().then((snapShot) => {
        let todos = [];
        snapShot.forEach((doc)=>{
            todos.push({
                id:doc.id,
                content: doc.data().content,
                isComplete:doc.data().isComplete,
                timeSecond: doc.data().timeSecond,
            });
        });
        return todos;
    });
    */
}

export const addToDo = async(content,uid) => {

    const docRef = await addDoc(collection(db,"todo"),{
        content:content,
        uid: uid,
        isComplete:false,
        createdAt:serverTimestamp(),
        timeSecond: 72000,
    })
    /*
    db.collection("todo").add({
        content:content,
        uid: uid,
        isComplete:false,
        createdAt:FieldValue.serverTimestamp(),
        timeSecond: 72000,
    })
    */
}

export const todoDelete = async(id) => {
    await deleteDoc(doc(db,"todo",id));
    //db.collection("todo").doc(id).delete();
}

export const toggleComplete = async(id) => {
    const docRef = doc(db, "todo", id);
    await updateDoc(docRef,{
        isComplete: docRef.data().isComplete ? false : true,
    })

    /*
    const todo = await db.collection("todo").doc(id).get();
    return db.collection("todo").doc(id).update({
        // 三項演算子
        isComplete: todo.data().isComplete ? false : true,
    });
    */
}

export const getTodo = async(id) => {

    const docRef = doc(db, "todo", id);
    const docSnap = await getDoc(docRef);

    return {
        id:docSnap.id,
        content: docSnap.data().content,
        isComplete:docSnap.data().isComplete,
        timeSecond: docSnap.data().timeSecond,
    }
    /*
    const doc = await db.collection("todo").doc(id).get();
    return {
        id:doc.id,
        content: doc.data().content,
        isComplete:doc.data().isComplete,
        timeSecond: doc.data().timeSecond,
            };
            */
}

export const updateTaskTime = async(id,newTimeSecond) => {
    const docRef = doc(db, "todo", id);
    await updateDoc(docRef,{
        timeSecond: newTimeSecond,
    })
    /*
    const todo = await db.collection("todo").doc(id).get();
    return db.collection("todo").doc(id).update({
        timeSecond: newTimeSecond,
    });
    */
}