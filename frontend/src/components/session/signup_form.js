import React from 'react';
import { withRouter } from 'react-router-dom';
import "./session.css";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return <div className="login-form-container">
        <form className="login-form-box" onSubmit={this.handleSubmit}>
          <div className="login-form">
            <br />
            <input 
              className="login-text-box"
              type="text" 
              value={this.state.email} 
              onChange={this.update("email")} 
              placeholder="Email" />
            <br />
            <input 
              className="login-text-box"
              type="text" 
              value={this.state.name} 
              onChange={this.update("name")} 
              placeholder="Full Name" />
            <br /><br />
            <input 
              className="login-text-box"
              type="password" 
              value={this.state.password} 
              onChange={this.update("password")} 
              placeholder="Password" />
            <br />
            <input 
              className="login-text-box"
              type="password" 
              value={this.state.password2} 
              onChange={this.update("password2")} placeholder="Confirm Password" />
            <br /><br />
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
        </form>
      </div>;
  }
}

export default withRouter(SignupForm);