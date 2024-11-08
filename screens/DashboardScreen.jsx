import React, { useState } from "react";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { analyzeImage, saveImage, uploadImageToFirebase } from '../service/imageService';

function DashboardScreen({ navigation }) {

    const [image, setImage] = useState(null);
    const [labels, setLabels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const handleAnalyzeImage = async () => {
        try {
            if (!image) {
                alert('Please provide an image to analyze');
                return;
            }

            setIsLoading(true)
            const imageURL = await uploadImageToFirebase(image);

            const result = await analyzeImage(image);
            setLabels(result);

            console.log("imageURL ", imageURL)
            if (result) {
                await saveImage(result, imageURL)
            }

        } catch (error) {
            alert('Error analyzing image: ' + error.message);
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Smart View</Text>
            <View style={styles.body}>
                <View style={styles.image_container}>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>
                <Pressable onPress={pickImage} style={styles.btn} >
                    <Text style={styles.btn_text}>Pick an image from your galary</Text>
                </Pressable>
                <Pressable onPress={handleAnalyzeImage} style={[styles.btn, isLoading && styles.btn_disabled]} disabled={isLoading} >
                    <Text style={styles.btn_text}>
                        {isLoading ? 'Analyzing...' : 'Analyze Selected Image'}
                    </Text>
                </Pressable>
                {labels.length > 0 ?
                    (
                        <View>
                            <View style={styles.labels_container}>
                                {
                                    labels.map((label) => (
                                        <View key={label.mid} style={styles.label_container}>
                                            <Text style={styles.label}>
                                                {label.description}
                                            </Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text></Text>
                        </View>
                    )
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
        fontWeight: 'bold'
    },
    body: {
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 12,
        margin: 15
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
    btn_disabled: {
        opacity: 0.7,
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

export default DashboardScreen;
