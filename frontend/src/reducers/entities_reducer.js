import { combineReducers } from 'redux';
import SpeechReducer from './speech_reducer';

export default combineReducers({
    speech: SpeechReducer
});