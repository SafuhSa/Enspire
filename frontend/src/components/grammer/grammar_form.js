import React from "react";
import { withRouter } from "react-router-dom";

class GrammarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", prevs: "", idvView: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.updatetext = this.updatetext.bind(this);
    this.renderLastCorrect = this.renderLastCorrect.bind(this);
    this.renderAllCorrections = this.renderAllCorrections.bind(this);
    this.renderIndividual = this.renderIndividual.bind(this);
  }

  componentWillMount() {
    this.props.fetchCorrections();
  }

  componentWillReceiveProps(nextProps) {

    this.setState({ prevs: Object.values(nextProps.allCorrections) });
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

  
  renderLastCorrect() {
    let responses = this.props.lastCorrection;
    if (!responses) return null;
    let result = [];
    
    for (let i = 0; i < responses.correcttext.length; i++) {
      const errs = responses.correcttext[i];
      const bad = errs.bad;
      const type = errs.type;
      const better = errs.better.slice(0, 2).join(" , ");

      result.push(
        <div key={i}>
         <ul>
          <li>Err N# {i + 1}</li>
          <li>bad: {bad} </li>
          <li>better: {better} </li>
          <li>type: {type} </li>
          ------------------------------------
        </ul>
        </div>
      );
    }
    return result;
  }

  renderIndividual() {
    if (!this.state.idvView) return  null;

    let result = [];
    
    result.push(
      <div key={'text'}>
        {this.state.idvView.wrongtext}
      </div>
    )
    for (let i = 0; i < this.state.idvView.correcttext.length; i++) {
      const errs = this.state.idvView.correcttext[i];
      const bad = errs.bad;
      const type = errs.type;
      const better = errs.better.slice(0, 2).join(" , ");

      result.push(
        <div key={i}>
        <ul>
          <li>Err N# {i + 1}</li>
          <li>bad: {bad} </li>
          <li>better: {better} </li>
          <li>type: {type} </li>
        </ul>
          --------------
        </div>
      );
    }
    this.state.idvView = '';
    return result;
  }

  renderAllCorrections() {
    let result = [];

    for (let i = 0; i < this.state.prevs.length; i++) {
      const errs = this.state.prevs[i];
      const date = new Date(errs.date);

      result.push(
        <div key={i}>
          <button onClick={() => this.setState({ idvView: errs })}>
            {date.toLocaleString()}
          </button>
        </div>
      );
    }

    return result;
  }

  // how is you ? I'm a engeneer. i'm work at A / a

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

    let numErros;
    if (this.props.lastCorrection) {
      numErros = this.props.lastCorrection.correcttext.length;
    }


    return (
      <div>
        <h3>TEXT CORRECTION</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderErrors()}
          <div>
            <textarea onChange={this.updatetext} />
          </div>
          <input type="submit" value="Check Grammar" />
        </form>
        <div>
          <h3> Number of errors: {numErros} </h3>
          {this.renderLastCorrect()}
        </div>
        <div>History: {this.renderAllCorrections()}</div>
        { this.renderIndividual()}
      </div>
    );
  }
}

export default withRouter(GrammarForm);
