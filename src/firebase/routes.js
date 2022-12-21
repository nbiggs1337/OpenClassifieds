import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const collect = collection(db, 'example');

export const getData = async () => {
    const data = await getDocs(collect);
    console.log(data)
}

export const createData = async (dataObj) => {
    try {
        const add = await addDoc(collect, dataObj)
        console.log(add)
    }
    catch (e) {
        console.error(e)
    }
}