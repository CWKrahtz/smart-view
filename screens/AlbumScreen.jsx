import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native"
import { getAllImages, getFilteredImages } from "../service/imageService";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker"
import { getDownloadURL, getStorage, ref } from "firebase/storage";

import { getAllLabels } from "../service/labelServices";

function AlbumScreen({ navigation }) {

    const [imageURL, setImageURL] = useState([]);

    const [imageData, setImageData] = useState([]);
    const [labelFilters, setLabelFilters] = useState([]);
    const [filter, setFilter] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            handleGettingOfData();
            return () => {
                // console.log(imageURL);
            };
        }, [])
    );

    const handleGettingOfData = async () => {
        setIsLoading(true);
        var allData = await getAllImages();
        var allLabels = await getAllLabels();
        setImageData(allData || []);  // Ensure compItems is an array
        setLabelFilters(allLabels);
        setIsLoading(false);

        // const storage = getStorage();
        // getDownloadURL(ref(storage, allData.image))
        // .then((url) => {
        //     // `url` is the download URL for 'images/stars.jpg'

        //     // console.log(allData);
        //     setImageURL([...imageURL, url])

        //     // Or inserted into an <img> element
        //     // const img = document.getElementById('myimg');
        //     // img.setAttribute('src', url);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
    };


    const handleSingle = (image) => {
        console.log("image Data:", image)
    }

    const handleFilterChange = async (itemValue) => {
        setFilter(itemValue);
        setIsLoading(true);
        
        try {
            let filteredData;
            if (itemValue === 'All') {  // Add an "All" option to show all images
                filteredData = await getAllImages();
            } else {
                filteredData = await getFilteredImages(itemValue);
            }
            setImageData(filteredData || []);
        } catch (error) {
            console.error('Error filtering images:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Uploads</Text>
            <Picker
                style={styles.text}
                selectedValue={filter}
                onValueChange={(itemValue, itemIndex) =>
                    handleFilterChange(itemValue)
                    //get images by filter
                    //apply new data to allData
                }>
                {
                    labelFilters.map((lb) => {
                        return (
                            <Picker.Item key={lb} label={lb} value={lb} />
                        )
                    })
                }

            </Picker>
            <View style={styles.body}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#F8F8FF" />
                ) : (
                    imageData.map((image) => {
                        return (
                            <View key={image.id}>
                                <Pressable onPress={() => navigation.navigate('SingleImage', { image })}>
                                    <Image 
                                        style={{ width: 200, height: 200 }}
                                        source={{ uri: `${image.image}` }}
                                        props={image}
                                    />
                                </Pressable>
                            </View>
                        );
                    })
                )}
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