import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Card from "../components/Card.jsx";
import { useGet } from "../hooks/useGet";


const Breeds = () => {
    const [data, error] = useGet("breeds");
    
   
    return (
        <View>
            {data != null && (
                <FlatList
                    data={data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <>
                            <Card breed={item} />
                        </>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

export default Breeds;

export const styles = StyleSheet.create({
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
