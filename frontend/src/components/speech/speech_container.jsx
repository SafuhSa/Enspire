import { createSpeech } from "../../actions/speech_actions";
import { connect } from "react-redux";
import Speech from "./speech";

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  createSpeech: speech => dispatch(createSpeech(speech))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Speech);
