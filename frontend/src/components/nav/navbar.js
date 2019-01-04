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
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className='navbar-right'>
          <div><Link to={'/tweets'}>All Tweets</Link></div>
          <div><Link to={'/profile'}>Profile</Link></div>
          <div><Link to={'/new_tweet'}>Write a Tweet</Link></div>
          <button className='dark-green-button' onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return <div className="navbar-right">
          <div><Link to={"/signup"}>Signup</Link></div>
          <div><Link to={"/login"}>Login</Link></div>
          <span className='dark-green-button'>Demo</span>
        </div>;
    }
  }

  render() {
    return (
      <div className="navbar">
        <span className="navbar-left">
          <i className="fas fa-seedling"></i>
          <h1>Enspire</h1>
        </span>
        {this.getLinks()}
      </div>
    )
  }
}

export default NavBar;