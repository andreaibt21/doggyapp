import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    TouchableHighlight,
    Pressable,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";


const Card = ({ breed }) => {
    const navigation = useNavigation();
 
   

    const [modalVisible, setModalVisible] = useState(false);

    if (breed != null)
        return (
                <Pressable style={styles.cardContainer}
                       onPress={()=>navigation.navigate("Breed", {breed})}
                >
                    {/* <CustomModal visible={modalVisible}  /> */}
                    {/* <Image source={bread.}> */}
                    <Image
                        source={{ uri: breed.image.url }}
                        style={styles.image}
                        accessibilityLabel={breed.name}
                        loadingIndicatorSource={<ActivityIndicator />}
                    />
                    <Text style={styles.name}>{breed.name}</Text>
                </Pressable>
        );

   
};
const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        resizeMode: 'center',

    },
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "lightblue",
        margin: 10,
        borderRadius: 20,
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 20
    },
    name: {
        fontSize: 20,
        width: 130,
    },
});

export default Card;
