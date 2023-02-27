import axios from "axios"

const http = axios.create({
    baseURL: "https://opentdb.com/api.php?amount=1"
})

export default http;