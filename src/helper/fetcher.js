import axios from "axios";
// Setting up base Url for fetching data

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


const fetcher = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
export default fetcher;