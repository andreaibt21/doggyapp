import { Text, View, Pressable, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { styles } from "../styles/styles";
import UserCtx from "../../userCtx";
import imagen from "../../assets/dogFace.png";
const Home = ({ navigation }) => {
    const { user, setUser } = useContext(UserCtx);

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/dogFace.png" )}
             style={style.image} />
            <Text style={style.title}>DoggyApp</Text>
            <View style={styles.links}>
                {user?.email ? (
                    <Pressable
                        onPress={() => navigation.navigate("Auth")}
                        style={styles.buttonHome}
                    >
                        <Text style={styles.buttonText}> Perfil</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={() => navigation.navigate("Form")}
                        style={styles.buttonHome}
                    >
                        <Text style={styles.buttonText}> Login</Text>
                        {/* <MaterialCommunityIcons name="login" size={48} color="blue" /> */}
                    </Pressable>
                )}

                <Pressable
                    onPress={() => navigation.navigate("Breeds")}
                    style={styles.buttonHome}
                >
                    <Text style={styles.buttonText}> Breeds</Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("Favorites")}
                    style={styles.buttonHome}
                >
                    <Text style={styles.buttonText}> My Favorites</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Home;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 50,
        marginBottom:30,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 100,
        resizeMode: "center",
    },
});
