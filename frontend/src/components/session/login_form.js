import React from 'react';
import { withRouter } from 'react-router-dom';
import "./session.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.currentUser === true) {
  //     this.props.history.push("/grammar");
  //   }

    // Set or clear errors
  //   this.setState({ errors: nextProps.errors });
  // }

  // Handle field updates (called in the render method)
  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }


  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  handleDemo(e) {
    e.preventDefault();
    let demo = { email: "email@email.com", password: 'password' }
    this.props.login(demo)
  }

  // Render the session errors if there are any
  renderErrors() {
    // debugger
    return (
      <ul>
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.props.errors[error]}</li>
        ))}
      </ul>
    );
  }


  render() {
    return <div className="login-form-container">
        <form className="login-form-box" onSubmit={this.handleSubmit}>
          <h1 className="login-text">Welcome back</h1>
          <br />
          <br />
          <div>
            <input type="text" className="login-text-box" value={this.state.email} onChange={this.update("email")} placeholder="Email" />
            <br />
            <input type="password" className="login-text-box" value={this.state.password} onChange={this.update("password")} placeholder="Password" />
            <br />
            <br />
            <br />
            <input className="login-submit" type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
          <br />
          {/* <input 
            className='login-submit'
            id='demo'
            type='submit'  
            value='Demo Log in' 
            onClick={this.handleDemo.bind(this)}  /> */}
        </form>
      </div>;
  }
}

export default withRouter(LoginForm);