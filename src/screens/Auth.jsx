import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import UserCtx from "../../userCtx";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/styles.js";

const auth = getAuth();

const Auth = ({ navigation }) => {
    const { user, setUser } = useContext(UserCtx);

    const logout = () => {
        auth.signOut()
        .then(()=>{
            setUser({ email: '' });
            deleteUserFromAsyncStorage('email');
            navigation.navigate("Home");
        }).catch(err=> console.log('error al logout: ', err))
    };

    const deleteUserFromAsyncStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={style.text}>Registrado con el email</Text>
            <Text style={style.mail}> {user.email}</Text>
            <Pressable style={styles.button}
                onPress={logout}>
                <Text>logout</Text>
            </Pressable>
        
        </View>
    );
};

export default Auth;

export const style = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
    },
    text: {
        fontSize: 30,
        width: 300,
        textAlign:"center"
    },mail: {
        fontSize: 25,
        width: 300,
        textAlign:"center"
    },
});
