import { RECEIVE_SPEECH } from '../actions/speech_actions';

const SpeechReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_SPEECH:
            newState.all = action.Speech.data;
            return newState;
        default:
            return state;
    }
};

export default SpeechReducer;