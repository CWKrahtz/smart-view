import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { addDoc, collection, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Alert } from 'react-native';


//Analyze Selected Image
export const analyzeImage = async (image) => {
    try {
        if (!image) {
            throw new Error('Please provide an image to analyze');
        }

        //API KEY to Cloud Vision
        const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;
        const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        // read image from the local URI and convert to base64
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

//Image - Save Selected Image to User profile in firestore database
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
        // console.log(imageURI.labels)
        //REFERENCE USER AND IMAGE UPLOADS COLLECTION
        const userDocRef = doc(db, 'users', uid);
        const userImageDocRef = collection(userDocRef, 'imageUploads')
        // //ADD IMAGE URI AND LABELS/TAGS TO FIREBASE DATABASE UNDER USER'S uid
        await addDoc(userImageDocRef, imageURI)
        //ALERT USER IF IMAGE UPLOAD WAS SUCCESS.
        Alert.alert('Image Upload Success!!')
    } catch {
        //ALERT USER IF FAIL
        Alert.alert('Failed To Upload Image')
    }
}

//Image Tags - Save Tags for Selected Image


//All Tags - Save tags in firestore database


//TODO: Save Image URI
//TODO: Save Image Labels
//TODO: Save Labels to own collection (All labels)
//TODO: Save Image Labels