import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Form from "./src/screens/Form";
import Breeds from "./src/screens/Breeds";
import Breed from "./src/screens/Breed";
import Auth from "./src/screens/Auth";
import Favorites from "./src/screens/Favorites";
import ForgotPassword from "./src/screens/ForgotPassword";
import { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserCtx from "./userCtx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, PoorStory_400Regular } from "@expo-google-fonts/dev";

import { setCustomText, setCustomTextInput } from "react-native-global-props";

const Stack = createNativeStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        PoorStory_400Regular,
    });
    const customText = {
        style: {
            fontFamily: "PoorStory_400Regular",
        },
    };

    const [user, setUser] = useState({
        email: "",
    });

    const getUserFromAsyncStorage = async () => {
        try {
            const userEmail = await AsyncStorage.getItem("email");
            return userEmail !== null
                ? setUser((prev) => ({ ...prev, email: userEmail }))
                : null;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const savedUser = getUserFromAsyncStorage();
        // console.log("saved user", savedUser);
    }, []);
    if (fontsLoaded == true) {
        setCustomText(customText);
        setCustomTextInput(customText);

        return (
            <UserCtx.Provider value={{ user, setUser }}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: "gray",
                            },
                            headerTintColor: "white",
                            headerBackTitleStyle: {
                                fontWeight: "700",
                            },
                            headerTitleStyle: {
                                fontFamily: "PoorStory_400Regular",
                                fontWeight: "bold",
                            },
                        }}
                    >
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{ title: "Home" }}
                        />
                                <Stack.Screen
                                    name="Auth"
                                    component={Auth}
                                    options={{ title: "Auth" }}
                                />
                     
                                {/* <Stack.Screen name="Login" component={Login} options={{title:'Login'}}/> */}
                                <Stack.Screen
                                    name="Form"
                                    component={Form}
                                    options={{ title: "login with firebase" }}
                                />
                                <Stack.Screen
                                    name="Breeds"
                                    component={Breeds}
                                    options={{ title: "Breeds " }}
                                />
                                <Stack.Screen
                                    name="Breed"
                                    component={Breed}
                                    options={{ title: "Breed " }}
                                />
                                <Stack.Screen
                                    name="Favorites"
                                    component={Favorites}
                                    options={{ title: "Favorites " }}
                                />
                                <Stack.Screen
                                    name="ForgotPassword"
                                    component={ForgotPassword}
                                    options={{ title: "Forgot Password " }}
                                />
                                
                       
                    </Stack.Navigator>
                </NavigationContainer>
            </UserCtx.Provider>
        );
    }
}
