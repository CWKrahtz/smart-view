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
    };

    const handleFilterChange = async (itemValue) => {
        setFilter(itemValue);
        setIsLoading(true);

        try {
            let filteredData;
            filteredData = await getFilteredImages(itemValue);

            setImageData(filteredData || []);
        } catch (error) {
            console.error('Error filtering images:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Uploads</Text>
            <Picker
                style={styles.picker}
                dropdownIconColor="#F8F8FF" 
                itemStyle={styles.pickerItem}
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
            <ScrollView>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#F8F8FF" />
                ) : (
                    <View style={styles.image_container}>
                        {
                            imageData.map((image) => {
                                return (
                                    <View style={styles.image_wrap} key={image.id}>
                                        <Pressable onPress={() => navigation.navigate('SingleImage', { image })}>
                                            <Image
                                                style={styles.image}
                                                source={{ uri: `${image.image}` }}
                                                props={image}
                                            />
                                        </Pressable>
                                    </View>
                                )
                            })
                        }
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingTop: 75,
        backgroundColor: '#16161D'
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
        fontWeight: 'bold'
    },
    picker: {
        color: '#F8F8FF',
        backgroundColor: 'transparent',
    },
    pickerItem: {
        color: '#F8F8FF',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8
    },
    image_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    image_wrap: {
        width: '48%', // Allows for 2 images per row with some spacing
        marginBottom: 10,
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