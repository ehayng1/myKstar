import { get, ref, set } from "firebase/database";
import { database } from "../Firebase";
import { songs } from "./songs.example";

export async function uploadSongs () {
    const dbRef = ref(database, "/songs");
    set(dbRef, songs)
}

export async function downloadSongs () {
    const dbRef = ref(database, "/songs");
    return (await get(dbRef)).val()
}