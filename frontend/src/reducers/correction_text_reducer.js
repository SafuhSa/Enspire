import { RECEIVE_TEXT, RECEIVE_TEXT_ERRORS, RECEIVE_ALL_TEXT } from "../actions/correction_text_action";
import merge from "lodash/merge";

const _nullErrors = [];

const CorrectionReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_TEXT:
      return merge({}, state, {  last: action.text.data  });

    case RECEIVE_ALL_TEXT:
      return merge({}, state, {  All: action.texts.data  });

    case RECEIVE_TEXT_ERRORS:
      return _nullErrors;

    default:
      return state;
  }
};

export default CorrectionReducer;