import { useContext, useEffect, useState } from "react";
import UserCtx from "../../userCtx";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

export const useFavList = () => {
    const { user, setUser } = useContext(UserCtx);
    const [favList, setFavList] = useState([]);
    const [isFavItem, setIsFavItem] = useState(false);

    useEffect(() => {
        getFavorites();
    }, []);

    const isFavorite = async (dog) => {
        const { id } = dog;

        const isFavAlready = favList.find((fav) => fav.id === id);
        console.log("isFavAlready", isFavAlready, isFavAlready ? true : false);
        if (isFavAlready) {
            setIsFavItem((prev) => (prev = true));
            console.log("ya está");
        }
        // else {
        //     setIsFavItem((prev) => (prev = false));
        // }
    };

    const addFavorite = async (dog) => {
        isFavorite(dog);
        if (isFavItem) {
            removeFavorite(dog);
            setIsFavItem((prev) => (prev = false));
        } else {
            setFavList([...favList, dog]);
            console.log("dog fav", dog);
            console.log("favList", favList);
            setIsFavItem((prev) => (prev = true));
            console.log("user.email", user.email)
            const reference = doc(firestore, "users/" + user.email);
            updateDoc(reference, { favorites: [...favList, dog] });
        }
    };
    const removeFavorite = async (dog) => {
        const newList = favList.filter((item) => item.id != dog.id);
        const reference = doc(firestore, "users/" + user.email);
        await updateDoc(reference, { favorites: [...newList] });
        setFavList((prev) => (prev = newList));
    };

    const getFavorites = async () => {
        const reference = doc(firestore, "users/" + user.email);
        const respuesta = await getDoc(reference);
        const data = await respuesta.data();
        setFavList((prev = data?.favorites));
        console.log(data.favorites);
    };

    return {
        addFavorite,
        favList,
        getFavorites,
        removeFavorite,
        isFavItem,
        isFavorite,
    };
};
