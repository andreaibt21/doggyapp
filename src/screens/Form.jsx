//firebase
import { firebaseConfig } from "../../firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { app, initializeApp } from "firebase/app";
const auth = getAuth();

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    Text,
    View,
    Pressable,
    TextInput,
    TouchableHighlight,
    ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { styles } from "../styles/styles.js";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { loginValidationSchema } from "../validation/validationSchema";
import { firestore } from "../../firebase";



//contexto
import UserCtx from "../../userCtx";
import { doc, setDoc } from "firebase/firestore";

const Form = () => {
    const navigation = useNavigation();
    const { user, setUser } = useContext(UserCtx);
    const [isVisible, setIsVisible] = useState(true);
    const [isNewUser, setIsNewUser] = useState(false);
    const [initializing, setInitializing] = useState(true);

    const stateChange = (user) => {
        setUser((prev) => (prev = user));
        if (initializing) {
            setInitializing((prev) => (prev = false));
        }
    };

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(stateChange);
        return subscriber;
    }, []);

    const handleRegister = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredentials) => {
                setUser((prev) => ({ ...prev, email: values.email }));
                const docRef = doc(firestore, `users/${values.email}`);
                setDoc(docRef, {
                    favorites: []
                });
                
                console.log(userCredentials);
                storeUser(values.email);
            })
            .catch((err) => console.log("error al registrar: ", err));
    };
    const handleLogin = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredentials) => {
                console.log(userCredentials);
                setUser((prev) => ({ ...prev, email: values.email }));
                storeUser(values.email);
                navigation.navigate("Home")
            })
            .catch((err) => console.log("error a iniciar sesion: ", err));
    };
    const storeUser = async (user) => {
        try {
            const userEmail = JSON.stringify(user);
            AsyncStorage.setItem("email", userEmail);
        } catch (error) {}
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
                isNewUser ? handleRegister(values) : handleLogin(values);
            }}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
            }) => (
                <View style={styles.container}>
                    {errors.email && touched.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                    )}
                    <View style={styles.inputWithIcon}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={"lightblue"}
                            onChangeText={handleChange("email")}
                            name="email"
                            value={values.email}
                            textAlignVertical="bottom"
                        />
                        <MaterialIcons name="alternate-email" size={24} />
                    </View>

                    {errors.password && touched.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                    )}

                    <View style={styles.inputWithIcon}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={"lightblue"}
                            onChangeText={handleChange("password")}
                            name="password"
                            value={values.password}
                            textAlignVertical="bottom"
                            secureTextEntry={isVisible}
                        />
                        <Pressable onPress={() => setIsVisible(!isVisible)}>
                            <Feather
                                name={isVisible ? "eye-off" : "eye"}
                                size={24}
                            />
                        </Pressable>
                    </View>

                    <TouchableHighlight
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        {isNewUser ? (
                            <Text style={styles.buttonText}>Register</Text>
                        ) : (
                            <Text style={styles.buttonText}>sign in</Text>
                        )}
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => setIsNewUser(!isNewUser)}
                    >
                        {isNewUser ? (
                            <Text style={styles.buttonText}>
                                I already have an account
                            </Text>
                        ) : (
                            <Text style={styles.buttonText}>
                                I want to create an account
                            </Text>
                        )}
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={() => navigation.navigate("ForgotPassword")}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Forgot password</Text>
                    </TouchableHighlight>
                </View>
            )}
        </Formik>
    );
};

export default Form;
