import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { auth, db } from '../firebase';
import { Alert } from 'react-native';


// // Upload Image To Firebase Storage
export const uploadImageToFirebase = async (uri) => {
    try {
        const response = await fetch(uri);  // Fetch image from local URI
        const blob = await response.blob(); // Convert to blob

        const storage = getStorage();
        const storageRef = ref(storage, `images/${auth.currentUser.uid}/${Date.now()}`);  // Define storage path

        await uploadBytes(storageRef, blob);  // Upload the image to Firebase Storage
        const downloadURL = await getDownloadURL(storageRef);  // Get the download URL

        return downloadURL;  // Return the download URL
    } catch (error) {
        console.log('Error uploading image: ', error);
        throw error;
    }
};

//Analyze Selected Image
export const analyzeImage = async (image) => {
    try {
        if (!image) {
            throw new Error('Please provide an image to analyze');
        }

        const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;
        const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        const base64ImageData = await FileSystem.readAsStringAsync(image, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const reqData = {
            requests: [
                {
                    image: {
                        content: base64ImageData,
                    },
                    features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
                },
            ],
        };

        const apiResponse = await axios.post(apiURL, reqData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return apiResponse.data.responses[0].labelAnnotations;

    } catch (error) {
        console.log('Error analyzing image: ', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.error.message : error.message);
    }
};

// Save Image & Labels - User Profile Firestore
export const saveImage = async (tags, image) => {

    const uid = auth.currentUser.uid;
    const imageURI = {
        image,
        labels: [
            tags[0].description,
            tags[1].description,
            tags[2].description,
            tags[3].description,
            tags[4].description
        ]      
    };

    try {
        
        //REFERENCE USER AND IMAGE UPLOADS COLLECTION
        const userDocRef = doc(db, 'users', uid);
        const userImageDocRef = collection(userDocRef, 'imageUploads');

        // //ADD IMAGE URI AND LABELS/TAGS TO FIREBASE DATABASE UNDER USER'S uid
        await addDoc(userImageDocRef, imageURI);

        // Save unique labels to filterUploads
        await saveUniqueLabels(imageURI.labels);

        //ALERT USER IF IMAGE UPLOAD WAS SUCCESS.
        Alert.alert('Image Upload Success!!');

    } catch {
        //ALERT USER IF FAIL
        Alert.alert('Failed To Upload Image');
    }
}

// Save unique labels to filterUploads
export const saveUniqueLabels = async (newLabels) => {
    const uid = auth.currentUser.uid;
    try {
        const userDocRef = doc(db, 'users', uid);
        const filterUploadsDocRef = doc(userDocRef, 'filterUploads', 'labels');

        // Get existing labels
        const filterUploadsDoc = await getDoc(filterUploadsDocRef);
        let existingLabels = filterUploadsDoc.exists() ? filterUploadsDoc.data().labels : [];

        // Filter out labels that already exist
        const uniqueNewLabels = newLabels.filter(label => !existingLabels.includes(label));

        // If there are new unique labels, add them to the array
        if (uniqueNewLabels.length > 0) {
            await setDoc(filterUploadsDocRef, {
                labels: arrayUnion(...uniqueNewLabels)
            }, { merge: true });
        }
    } catch (error) {
        console.error('Error saving unique labels:', error);
        throw error;
    }
};

// Get All Images - By User
export const getAllImages = (async () => {
    const uid = auth.currentUser.uid;    
    try {
        const userDocRef = doc(db, 'users', uid);
        const userImageDocRef = collection(userDocRef, 'imageUploads');

        var q = query(userImageDocRef)

        var allitems = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            allitems.push({ ...doc.data(), id: doc.id })
        })

        // console.log(allitems)
        return(allitems)
        
    } catch (error) {
        //ALERT USER IF FAIL
        Alert.alert('Failed To Fetch Image');
    }
})

//All Tags - Save tags in firestore database

export const getFilteredImages = async (filterLabel) => {
    const uid = auth.currentUser.uid;    
    try {
        const userDocRef = doc(db, 'users', uid);
        const userImageDocRef = collection(userDocRef, 'imageUploads');
        
        // If filterLabel is 'All' or empty, return all images
        if (!filterLabel || filterLabel === 'All') {
            return getAllImages();
        }

        const q = query(userImageDocRef);
        const filteredItems = [];
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Check if the image's labels include the filter label (case-insensitive)
            if (data.labels && data.labels.some(label => 
                label.toLowerCase() === filterLabel.toLowerCase()
            )) {
                filteredItems.push({ ...data, id: doc.id });
            }
        });
        
        return filteredItems;
        
    } catch (error) {
        console.error('Error in getFilteredImages:', error);
        Alert.alert('Failed To Fetch Filtered Images');
        return [];
    }
};