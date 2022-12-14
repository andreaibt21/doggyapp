import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: 250,
        marginBottom: 20,
        fontSize: 18,
        height: 50,
        borderBottomWidth: 1,
        marginEnd: -25,
    },
    inputWithIcon: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        borderRadius: 10,
        marginTop: 25,
        padding: 10,
        alignItems: "center",
        width: 350,
        backgroundColor: "lightblue",
    },
    buttonText: {
        fontSize: 18,
    },
    buttonHome: {
      borderRadius: 10,
      marginTop: 25,
      padding: 10,
      alignItems: "center",
      width: 350,
      backgroundColor: "lightblue",


    },
    error: {
        color: "red",
        alignSelf: "center",
    },
    links:{
        


    }
});
