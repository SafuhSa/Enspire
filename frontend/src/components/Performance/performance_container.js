import { connect } from "react-redux";
import { fetchCorrections } from "../../actions/correction_text_action";
import Perforamce from "./performace";


const mapStateToProps = state => {
    // debugger
    return {
        errors: state.errors.text,
        lastCorrection: state.correction.last,
        allCorrections: state.correction.All
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCorrections: () => dispatch(fetchCorrections())
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Perforamce);
