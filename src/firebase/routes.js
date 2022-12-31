import { collection, doc, getDocs, getDoc, updateDoc, deleteDoc, addDoc, query, where } from "firebase/firestore";
import { db, storageRef, storage } from "./firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";



///Image Storeage 

export const storeImg = async (img, state) => {
    if (!img) {
        throw new Error("Not a valid image.")
    } else {
        return new Promise((rej, res) => {
            const storageRef = ref(storage, `/files/${img.name}`)
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    // update progress - this will be tied to react state setter on frontend - must be at 100 to nav page
                    // state(percent);
                    console.log(percent);
                },
                (err) => console.log(err),
                async () => {
                    // download url
                    await getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (url) => {
                            await createData(state, url)
                            return url;
                        });
                }

            )
            // .then(data => {
            //     console.log("from upload promise", data)
            // })
            return getDownloadURL(uploadTask.snapshot.ref);
        })
    }

}


// Main Collection Instance we use to access itself
export const collect = collection(db, 'example');

// Basic .findAll docs - in given collection
export const getData = async () => {
    const data = await getDocs(collect);
    console.log(data)
}

// Basic .create in given collection
export const createData = async (dataObj, image = null) => {
    try {
        // if (image) { // if images included - process first;
        //     console.log("Hitting the if check in routes")
        //     await storeImg(image).then(value => {
        //         console.log("value", value)
        //         console.log("Image Stored in Firestore")
        //         const add = addDoc(collect, dataObj)
        //         const docRef = doc(db, "example", add.id);
        //         dataObj.id = add.id;
        //         dataObj.image = [];

        //         return updateDoc(docRef, dataObj);
        //     })
        // } else { // no image uploaded 

        const add = await addDoc(collect, dataObj)
        const docRef = doc(db, "example", add.id);
        dataObj.id = add.id;

        dataObj.image.push(image)

        return await updateDoc(docRef, dataObj);
        // }


    }
    catch (e) {
        console.error(e)
    }
}

//Update a document

export const updateData = async (dataObj, collection) => {
    try {
        const docRef = doc(db, collection, dataObj.id);
        await updateDoc(docRef, dataObj)
            .then(res => {
                console.log(res)
            })

    } catch (e) {
        console.log(e)
    }
}


//Delete a Single Doc

export const destroyDoc = async (collection, id) => {
    return await deleteDoc(doc(db, collection, id));
}

//Get a single document
export const getADoc = async (id) => {
    try {
        //refereance to the doc
        const docRef = doc(db, "example", id)
        //get a snapshot / get data
        const docSnap = await getDoc(docRef)
        //Create a JSON obj w the data.
        let data = docSnap.data();
        console.log(docSnap.id)
        //set the id
        data.id = docSnap.id;
        //log/return
        // console.log(data)
        return data
    } catch (e) {
        //do something 
        console.log(e)
    }
}



// Find specifc matching docs with given table and param to search for
export const getPostsParam = async (table, param) => {
    try {
        const q = query(collect, where(table, "==", param));
        let final = [];
        await getDocs(q)
            .then(docs => {
                docs.forEach(doc => {
                    console.log(doc.id)
                    // Add the doc to the array,
                    final.push(doc.data())
                    // Add the _ID to the doc that was just added. 
                    final[final.length - 1].id = doc.id;
                })
                // data lives in docs.docs[i]._document.data.value.mapValue.fields
                // console.log("From Route method:", final, typeof(final))
                return final;
            })
            .catch(e => {
                console.error(e);
                return e;
            })
        return final;
    }
    catch (e) {
        console.error(e)
    }

}