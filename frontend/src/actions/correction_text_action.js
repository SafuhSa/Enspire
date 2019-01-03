import axios from "axios";
export const RECEIVE_TEXT = "RECEIVE_TEXT";

export const correctionTexts = text =>
  axios.get("https://api.textgears.com/check.php", {
    params: {
      key: "tZuTzrp9oTpUo2f6",
      text: text
    }
  });

export const receiveText = text => ({
  type: RECEIVE_TEXT,
  text
});

export const correctionText = data => dispatch => {
  correctionTexts(data)
    .then(text => dispatch(receiveText(text)))
    .catch(err => console.log(err));
};