import React from "react";
import { withRouter } from "react-router-dom";

class GrammarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.updatetext = this.updatetext.bind(this);
  }

  updatetext(e) {
    this.setState({
      text: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.correct(this.state.text);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.props.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {

    return (
      <div>
        <h3>TEXT CORRECTION</h3>
  }
        <form onSubmit={this.handleSubmit}>
          <div>
            <textarea onChange={this.updatetext} />
          </div>
          <input type="submit" value="correct grammar" />
        </form>

        <h2>{this.props.correctText}</h2>
      </div>
    );
  }
}

export default withRouter(GrammarForm);
