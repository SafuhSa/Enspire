import { connect } from "react-redux";
import { correctionText, fetchCorrections } from "../../actions/correction_text_action";
import GrammarForm from './grammar_form'


const mapStateToProps = state => {
  // debugger
  return {
    errors: state.errors.text,
    // correction: state.correction
    lastCorrection: state.correction.last,
    allCorrections: state.correction.All
  };
};

const mapDispatchToProps = dispatch => {
  return {
    correct: text => dispatch(correctionText(text)),
    fetchCorrections: () => dispatch(fetchCorrections())
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(GrammarForm);
