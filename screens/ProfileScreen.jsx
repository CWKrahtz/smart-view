import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { handleSignOut } from "../service/authServices";

function ProfileScreen({ navigation }) {

    const handleLogout = () => {
        handleSignOut();
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Profile</Text>
            <View style={styles.body}>
                <Pressable style={styles.btn} onPress={handleLogout}>
                    <Text style={styles.btn_text}>Log Out</Text>
                </Pressable>
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

export default ProfileScreen;