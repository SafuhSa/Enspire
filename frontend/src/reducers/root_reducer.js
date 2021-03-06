import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import correction from "./correction_text_reducer";


const RootReducer = combineReducers({
  session,
  errors,
  correction
});


export default RootReducer;
