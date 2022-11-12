import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import Card from "../components/Card.jsx";
import { useFavList } from "../hooks/useFavorites";
import UserCtx from "../../userCtx";

const Favorites = () => {
    const { user, setUser } = useContext(UserCtx);
if(user != null){
    const { favList, getFavorites } = useFavList();
    useEffect(() => {
        getFavorites();
    }, []);

    console.log(user)

    return (
        <>
            {user!= null? (
                <View>
                    {favList?.length !== 0 ? (
                        <FlatList
                            data={favList}
                            numColumns={1}
                            renderItem={({ item }) => <Card breed={item} />}
                            keyExtractor={(item) => item.id}
                        />
                    ) : (
                        <View style={styles.container}>
                            <Text style={styles.empty}>
                                You don't have any items on your list :(
                            </Text>
                        </View>
                    )}
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.empty}>You have to log in :)</Text>
                
                </View>
            )}
        </>
    );
}
};

export default Favorites;

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
    },
    empty: {
        fontSize: 30,
        width: 300,
        textAlign: "center"
    },
});
