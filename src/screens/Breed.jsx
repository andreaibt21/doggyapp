import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { StackScreenProps } from "@react-navigation/native";
import React, { useEffect, useContext } from "react";
import { useFonts, PoorStory_400Regular } from "@expo-google-fonts/dev";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useFavList } from "../hooks/useFavorites";
import UserCtx from "../../userCtx";

const Breed = ({ navigation, route } = StackScreenProps) => {
    const { favList, addFavorite, isFavItem, isFavorite } = useFavList();
    const { user, setUser } = useContext(UserCtx);

    let [fontsLoaded] = useFonts({
        PoorStory_400Regular,
    });
    const dog = route.params.breed;

    useEffect(() => {
        isFavorite(dog);
    }, [dog]);
    
    navigation.setOptions({ title: dog.name });

    if (fontsLoaded == true) {
        return (
            <View style={styles.container}>
                {dog != null && (
                    <>
                        <Image
                            source={{ uri: dog.image.url }}
                            style={styles.image}
                            accessibilityLabel={dog.name}
                        />

                        <View style={styles.details}>
                            <View style={styles.sub}>
                                <Text style={styles.title}>Details</Text>
                               {user.email !== "" &&
                                <Pressable
                                onPress={() => addFavorite(dog)}
                                >
                                    <MaterialIcons
                                        size={24}
                                        color="red"
                                        style={styles.heart}
                                        name={isFavItem ? "favorite" : "favorite-outline"}
                                        />
                                </Pressable>
                                    }
                            </View>
                            <View style={styles.box}>
                                <View style={styles.boxItem}>
                                    <Text style={styles.itemTitle}>Weight</Text>
                                    <Text style={styles.itemDetail}>
                                        {" "}
                                        {dog.weight.metric} (cm)
                                    </Text>
                                </View>
                                <View style={styles.boxItem}>
                                    <Text style={styles.itemTitle}>Heigth</Text>
                                    <Text style={styles.itemDetail}>
                                        {" "}
                                        {dog.height.metric} (cm)
                                    </Text>
                                </View>
                                <View style={styles.boxItem}>
                                    <Text style={styles.itemTitle}>
                                        Life Span
                                    </Text>
                                    <Text style={styles.itemDetail}>
                                        {" "}
                                        {dog.life_span}
                                    </Text>
                                </View>
                            </View>
                            {dog.breed_group && (
                                <View
                                    style={[
                                        styles.breedGroup,
                                        styles.itemTitleShort,
                                    ]}
                                >
                                    <Text style={styles.itemTitle}>
                                        Breed Group
                                    </Text>
                                    <Text style={styles.itemDetail}>
                                        {" "}
                                        {dog.breed_group}{" "}
                                    </Text>
                                </View>
                            )}
                            {dog.bred_for && (
                                <View style={styles.breedGroup}>
                                    <Text style={styles.itemTitle}>
                                        Bred for
                                    </Text>
                                    <Text style={styles.itemDetail}>
                                        {" "}
                                        {dog.bred_for}
                                    </Text>
                                </View>
                            )}
                            {dog.temperament && (
                                <View style={styles.breedGroup}>
                                    <Text style={styles.itemTitle}>
                                        Temperament
                                    </Text>
                                    <Text style={styles.itemDetail}>
                                        {" "}
                                        {dog.temperament}
                                    </Text>
                                </View>
                            )}
                            {dog.origin && (
                                <View style={styles.breedGroup}>
                                    <Text style={styles.itemTitle}>Origin</Text>
                                    <Text style={styles.itemDetail}>
                                        {dog.origin}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </>
                )}
            </View>
        );
    }
};

export default Breed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "PoorStory_400Regular",
    },
    details: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 300,
        height: 250,
        borderRadius: 80,
        resizeMode: "contain",
    },
    box: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    boxItem: {
        backgroundColor: "lightblue",
        margin: 10,
        textAlign: "center",
        padding: 5,
        borderRadius: 10,
        lineHeight: 30,
        fontSize: 18,
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
    },
    title: {
        textAlign: "center",
        fontSize: 50,
        fontWeight: "600",
    },
    breedGroup: {
        backgroundColor: "lightblue",
        margin: 10,
        textAlign: "center",
        padding: 5,
        borderRadius: 10,
        width: 200,
    },
    itemTitle: {
        fontWeight: "600",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "PoorStory_400Regular",
    },
    itemTitleShort: {
        width: 150,
    },
    itemDetail: {
        textAlign: "center",
    },
    sub: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 200,
    },
    heart: {
        padding: 5,
        marginLeft: 20,
        backgroundColor: "lightblue",
        borderRadius: 100,
    },
});
