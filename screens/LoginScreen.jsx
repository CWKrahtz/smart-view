import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { handleLogin } from "../service/authServices";

function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        if (inputId === 'email') {
            setEmail(inputValue);
        } else if (inputId === 'password') {
            setPassword(inputValue);
        }
    }, []);

    const login = () => {

        if (!email || !password) {
            Alert.alert("Error", "All fields are required.");
            return;
        }
        try {
            handleLogin(email, password);
        } catch (error) {
            Alert.alert("Error during sign up: ", error.message);
        }
        
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Welcome back</Text>
            <View style={styles.sub_container}>
                <Text style={styles.subheading}>Login to your account or </Text>
                <Text style={styles.subheading_link} onPress={() => navigation.navigate('Signup')}>create new account</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.inputrows}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        id="email"
                        placeholder="Enter your email"
                        placeholderTextColor='#FFFFFF40'
                        value={email}
                        onChangeText={(value) => inputChangedHandler('email', value)} />
                </View>
                <View style={styles.inputrows}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        id='password'
                        placeholder="Enter your password"
                        placeholderTextColor='#FFFFFF40'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(value) => inputChangedHandler('password', value)} />
                </View>
            </View>
            <View style={styles.btn_container}>
                <Pressable style={styles.btn} onPress={login}>
                    <Text style={styles.btn_text}>Login</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
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
    inputrows: {
        marginTop: 24,
    },
    label: {
        color: 'white',
        fontSize: 14,
        fontWeight: '200',
    },
    input: {
        width: '100%',
        height: 50,
        paddingLeft: 12,
        backgroundColor: '#444467',
        borderRadius: 10,
        fontSize: 16,
        color: 'white',
        marginTop: 10,
    },
    btn_container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 150,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        borderRadius: 10,
        backgroundColor: '#29293D',
        width: '60%',
    },
    btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default LoginScreen