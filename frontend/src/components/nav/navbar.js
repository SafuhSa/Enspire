import React from 'react';
import { Link } from 'react-router-dom'
import "./navbar.css";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout()
  
    // this.props.history.push('/')
  }

  handleDemo(e) {
    e.preventDefault();
    let demo = { email: "email@email.com", password: 'password' }
    this.props.login(demo)
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return <div className="navbar-right">
          <div>
            <Link to="/history">History</Link>
          </div>

          <button className="dark-green-button" onClick={this.logoutUser}>
            Logout
          </button>
        </div>;

    } else {

      return <div className="navbar-right">
          <div><Link to={"/signup"}>Signup</Link></div>
          <div><Link to={"/login"}>Login</Link></div>
          <button 
            className='dark-green-button'
            onClick={this.handleDemo.bind(this)}>
            Demo
          </button>
        </div>;
    }
  }

  render() {
    return <div className="navbar">
        <Link className='navbar-left' to={"/"}>
          <i className="fas fa-seedling" />
          <h1>Enspire</h1>
        </Link>  
        
        {this.getLinks()}
      </div>;
  }
}

export default NavBar;