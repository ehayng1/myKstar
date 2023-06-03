import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { get, ref, set, update } from "firebase/database";
import { auth, database } from "../Firebase";
import { createUser } from "./users.example";

export async function registerUser({ email, password, firstName, lastName }) {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  const db_ref = ref(database, `/users/${auth.currentUser.uid}`);
  await set(db_ref, createUser({ email, firstName, lastName }));
  return response;
}

export async function signInUser({ email, password }) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    })
    .catch((error) => {
      throw error;
    });
}

// get currently logged in user
export async function getUser() {
  const uid = auth.currentUser.uid;
  const dbRef = ref(database, `/users/${uid}`);
  return (await get(dbRef)).val();
}

// update user data with new data
export async function updateUser(data) {
  console.log(data);
  const uid = auth.currentUser.uid;
  const dbRef = ref(database, `/users/${uid}`);
  await update(dbRef, data);
}
