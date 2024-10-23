import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { handleSignOut } from "../authServices";
import { getAllImages } from "../service/imageService";
import { useFocusEffect } from "@react-navigation/native";
import { auth } from "../firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

function AlbumScreen({ navigation }) {

    const [imageURL, setImageURL] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            handleGettingOfData();
            return () => {
                // console.log(imageURL);
            };
        }, [])
    );

    // const handleGettingOfData = async () => {
    //     setIsLoading(true);
    //     var allData = await getAllImages();
    //     setImageData(allData || []);  // Ensure compItems is an array
    //     setIsLoading(false);

    //     const storage = getStorage();
    //     getDownloadURL(ref(storage, allData.image))
    //     .then((url) => {
    //         // `url` is the download URL for 'images/stars.jpg'

    //         // console.log(allData);
    //         setImageURL(url)
        
    //         // Or inserted into an <img> element
    //         // const img = document.getElementById('myimg');
    //         // img.setAttribute('src', url);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    // };


    const handleSingle = () => {
        console.log("Image Selected")
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Uploads</Text>
            <View style={styles.body}>

                {
                    imageData.map((data) => {
                        return (
                            <View key={data.id}>
                                <Text>{data.image}</Text>
                                <Image
                                    source={{ uri: imageURL }}  // Correct the source prop
                                />
                            </View>
                        );
                    })
                }


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingTop: 75,
        backgroundColor: '#16161D',
    },
    heading: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40
    },
    sub_container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 24
    },
    subheading: {
        color: 'white',
        fontSize: 14,
        fontWeight: '200'
    },
    subheading_link: {
        color: '#6573B6',
        textDecorationLine: true,
        fontWeight: 'bold'
    },
    body: {
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 300,
        margin: 25
    },
    image_container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#29293D',
        width: '100%',
        marginBottom: 24
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#F8F8FF',
        width: '100%',
        marginBottom: 24
    },
    btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#29293D',
    },
    label: {
        fontSize: 16,
        color: '#16161D',
        fontWeight: 'bold'
    },
    labels_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
    },
    label_container: {
        padding: 8,
        backgroundColor: '#D2D2FF',
        borderRadius: 10,
        margin: 5
    },
});

export default AlbumScreen;