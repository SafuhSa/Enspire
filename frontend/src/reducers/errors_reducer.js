import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import TextErrorsReducer from "./correction_text_errors_reducer";

export default combineReducers({
  session: SessionErrorsReducer,
  text: TextErrorsReducer
});
