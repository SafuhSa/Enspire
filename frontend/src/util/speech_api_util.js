import axios from "axios";

export const createSpeech = data => {
    
    return axios.post('/api/speech/', data)
}