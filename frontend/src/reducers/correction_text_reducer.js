import { RECEIVE_TEXT } from "../actions/correction_text_action";
import merge from "lodash/merge";

const CorrectionReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_TEXT:
      return merge( {}, state, action.text.data.errors);

    default:
      return state;
  }
};

export default CorrectionReducer;