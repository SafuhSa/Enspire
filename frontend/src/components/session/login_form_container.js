import { connect } from "react-redux";
import { login, correctionText } from "../../actions/session_actions";
import LoginForm from "./login_form";

const mapStateToProps = state => {
  return {
    errors: state.errors.session,
    correctText: state.correction.text
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    correct: text => dispatch(correctionText(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
