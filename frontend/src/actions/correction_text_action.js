import axios from "axios";
export const RECEIVE_TEXT = "RECEIVE_TEXT";
export const RECEIVE_TEXT_ERRORS = "RECEIVE_TEXT_ERRORS";
export const RECEIVE_ALL_TEXT = "RECEIVE_ALL_TEXT";

const correctionTexts = text => {
  return axios.post("/api/correctiontexts/", { text });
};

const receiveText = text => ({
  type: RECEIVE_TEXT,
  text
});

const receiveErrors = errors => ({
  type: RECEIVE_TEXT_ERRORS,
  errors
});

export const correctionText = data => dispatch => {
  
  correctionTexts(data)
  .then(text => dispatch(receiveText(text)))
  .catch(err => dispatch(receiveErrors(err.response.data)));
};

//-------------------

export const getCorrectText = () => {
  return axios.get("/api/correctiontexts/");
};

const receiveAllText = texts => ({
  type: RECEIVE_ALL_TEXT,
  texts
});

export const fetchCorrections = () => dispatch =>
  getCorrectText()
    .then(texts => dispatch(receiveAllText(texts)))
    .catch(err => dispatch(receiveErrors(err.response.data)));