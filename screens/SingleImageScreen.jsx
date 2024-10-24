import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"

function SingeImageScreen({ navigation ,route }) {

    // const [image, setImage] = useState(null);
    // const [labels, setLabels] = useState([])

    console.log(route.params)
    {imageData}

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Smart View</Text>
            <View style={styles.body}>
                <View style={styles.image_container}>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>
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

export default SingeImageScreen;
