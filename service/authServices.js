import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";


// Log in
export const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in user:", user.email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
        });
};

//Sign-up
export const handleSignUp = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
        id: user.uid,
        name: name,
        email: email,
        signUpDate: new Date().toString(),
    };

    try {
        await setDoc(doc(db, 'users', userData.id), userData);

        return user;
    } catch (error) {
        throw error;
    }
};

// Log out
export const handleSignOut = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out");
        })
        .catch((error) => {
            console.error("Sign-out error:", error);
        });
};