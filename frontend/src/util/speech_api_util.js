import axios from "axios";

export const createSpeech = data => {
    return axios.post('/api/Speech/', data)
}