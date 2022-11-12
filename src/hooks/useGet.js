import { useEffect, useState } from "react";
import axios from "axios";
const API = axios.create({
    baseURL: "https://api.thedogapi.com/v1/",
});

API.defaults.headers.common["Authorization"] =
    "live_6igV000lkv1mTrM2Dd79E4dO270n32449QqzH0Gz1SBOnF4R2eg5faKGGepGCkgB";

export const useGet = (endpoint) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const getData = (endpoint) => {
        API.get(endpoint)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                setError(err);
                console.error("Error: " + error);
            });

            
    };
  //  console.log("useGet", data);
    useEffect(() => {
        getData(endpoint);
    }, [endpoint]);
    return [data, error];
};
