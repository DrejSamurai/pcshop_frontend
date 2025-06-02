import axios from "axios"

const instance = axios.create({
    baseURL: 'http://5.189.180.48:3000',
})

export default instance;