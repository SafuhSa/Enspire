import * as SpeechUtil from '../util/speech_api_util';
export const RECEIVE_SPEECH = "RECEIVE_SPEECH";
export const RECEIVE_SPEECH_ERRORS = "RECEIVE_SPEECH_ERRORS";

export const createSpeech = Speech => dispatch => {
    console.log(Speech)
    debugger
   return  SpeechUtil.createSpeech(Speech)
        .then(SpeechData => dispatch(receiveSpeech(SpeechData)),
            errors => dispatch(receiveErrors(errors)))
};

const receiveSpeech = SpeechData => ({
  type: RECEIVE_SPEECH,
  Speech: SpeechData
});



const receiveErrors = errors => ({
    type: RECEIVE_SPEECH_ERRORS,
    errors
})