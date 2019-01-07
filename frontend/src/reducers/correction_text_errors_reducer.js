import {RECEIVE_TEXT_ERRORS, RECEIVE_TEXT} from '../actions/correction_text_action';

const _nullErrors = [];

const TextErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TEXT_ERRORS:
      return action.errors;
    case RECEIVE_TEXT:
      return _nullErrors;
    default:
      return state;
  }
};

export default TextErrorsReducer;
