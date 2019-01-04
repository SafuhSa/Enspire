import { connect } from "react-redux";
import { correctionText } from "../../actions/correction_text_action";
import GrammarForm from './grammar_form'


const mapStateToProps = state => {

  return {
    // errors: state.errors.session,
    correctText: state.correction.text
  };
};

const mapDispatchToProps = dispatch => {
  return {
    correct: text => dispatch(correctionText(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GrammarForm);
