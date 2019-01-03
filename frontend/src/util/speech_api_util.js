import axios from "axios";

export const createSpeech = data => {
    debugger
    return axios.post('/api/speech/', data)
}