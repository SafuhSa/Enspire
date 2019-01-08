import { connect } from "react-redux";
import { correctionText, fetchCorrections } from "../../actions/correction_text_action";
import HistoryPage from './history_page'


const mapStateToProps = state => {
    return {
        errors: state.errors.text,
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
