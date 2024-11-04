import { collection, doc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";

export const getAllLabels = (async () => {

    const uid = auth.currentUser.uid;

    try {
        // console.log("Getting labels...")
        const userDocRef = doc(db, 'users', uid);
        const userLabelDocRef = collection(userDocRef, 'filterUploads');

        var q = query(userLabelDocRef)

        var allitems = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            allitems = doc.data().labels
        })
        
        console.log(allitems)

        return(allitems)

    } catch (error) {
        console.log('Error fetching labels: ', error);
        throw error;
    }
});