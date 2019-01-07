import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { login } from "../../actions/session_actions";
import NavBar from "./navbar";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

const mapDispatchtoProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(NavBar);
