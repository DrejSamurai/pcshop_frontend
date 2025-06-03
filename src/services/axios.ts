import axios from "axios"

const instance = axios.create({
    baseURL: 'http://pcpartsmk.store:3000',
})

export default instance;