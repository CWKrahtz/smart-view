import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// Screens
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
// Auth
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import AlbumScreen from '../screens/AlbumScreen';
import SingeImageScreen from '../screens/SingleImageScreen';

// Navigations
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User Logged In... ' + user.email);
                setLoggedIn(true);
            } else {
                console.log('User Not Logged In');
                setLoggedIn(false);
            }
        });
        return unsubscribe;
    }, []);

    // Bottom Tab Navigation
    function Home() {
        return (
            <Tab.Navigator
                initialRouteName="Dashboard"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Dashboard') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'Album') {
                            iconName = focused ? 'albums' : 'albums-outline';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#9ED7F4',
                    tabBarInactiveTintColor: '#F8F8FF',
                    tabBarStyle: styles.tabBar,
                    tabBarLabelStyle: styles.tabBarLabel,
                })}
            >
                <Tab.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Album"
                    component={AlbumScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        );
    }

    return (
        <NavigationContainer>
            {loggedIn ? (
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <Stack.Screen
                        name="SingleImage"
                        component={SingeImageScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Signup"
                        component={SignupScreen}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#29293D',
        borderTopWidth: 0,
        elevation: 5,
        height: 100
    },
    tabBarLabel: {
        fontSize: 12,
        marginBottom: 5,
    },
});

export default Navigation;
