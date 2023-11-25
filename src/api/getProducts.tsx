import axios from "axios";

const getProducts = axios.create({
    baseURL: 'https://exclusiva-admin.vercel.app/api'

});

export default getProducts