import { RECEIVE_SPEECH } from '../actions/speech_actions';

const SpeechReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SPEECH:
        debugger
            return Object.assign({},state,action.Speech.data)
        default:
            return state;
    }
};

export default SpeechReducer;