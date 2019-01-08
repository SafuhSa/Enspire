import React from "react";
import { withRouter } from "react-router-dom";
import "./grammar.css"

class GrammarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", name: "", prevs: "", idvView: "", stream: false };

    this.transcript = "";
    this.handleSpeech = this.handleSpeech.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.updatetext = this.updatetext.bind(this);
    this.updateName = this.updateName.bind(this)
    this.renderLastCorrect = this.renderLastCorrect.bind(this);
    this.renderAllCorrections = this.renderAllCorrections.bind(this);
    this.renderIndividual = this.renderIndividual.bind(this);
  }

  handleSpeech(e) {
    e.preventDefault();
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (this.state.stream) {
      this.setState({ stream: false });
      this.recognition.stop();
      this.recognition.removeEventListener("end", this.recognition.start);
      this.recognition = null;

      this.setState({ text: this.transcript });
      // console.log("advxcawbsDv" + this.transcript)
      // this.props.createSpeech({
      //   user: this.props.currentUser.id,
      //   text: this.transcript
      // });
      // this.transcript = "";

      // let children = Array.from(document.querySelectorAll(".text > p"));
      // children.forEach(child => {
      //     child.parentNode.removeChild(child);
      // });
    } else {
      this.setState({ stream: true });

      this.recognition = new SpeechRecognition();
      this.recognition.interimResults = true;

      const texts = document.querySelector(".text");

      let p = document.createElement("p");
      texts.appendChild(p);

      this.recognition.addEventListener("result", e => {

        const transcript = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("");

        p.textContent = transcript;
        if (e.results[0].isFinal) {
          this.transcript += p.textContent + ". ";
          this.setState({ text: this.transcript });
          p = document.createElement("p");
          texts.appendChild(p);
        }
      });

      this.recognition.start();
      this.recognition.addEventListener("end", this.recognition.start);
    }
  }

  // componentWillMount() {
  //   this.props.fetchCorrections();
  // }
  componentDidMount() {
    this.props.fetchCorrections();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allCorrections) {
      this.setState({ prevs: Object.values(nextProps.allCorrections) });
    }
  }

  updatetext(e) {
    this.setState({
      text: e.currentTarget.value
    });
  }
  updateName(e) {
    this.setState({
      name: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger
      let obj = {text:this.state.text,name:this.state.name}
    this.props.correct(obj);
    // this.props.correct(this.state.name);
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
    if (!this.state.idvView) return null;

    let result = [];

    result.push(<div key={"text"}>{this.state.idvView.wrongtext}</div>);
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
    this.state.idvView = "";
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


  speak(text) {
    this.speaker.text = text
    speechSynthesis.speak(this.speaker);
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
    let numErros;
    if (this.props.lastCorrection) {
      numErros = this.props.lastCorrection.correcttext.length;
    }


    let buttonText = this.state.stream ? "Stop" : "Record";

    return <div className="grammar-page">
        <br />
        <br />
        <div className="grammar-box">
          <div className="flex">
            <button className="change-button">Change Topic</button>
            <h1 className="interview">Interview</h1>
          </div>

          <div className="flex">
            <button className="change-button">New Prompt</button>
            <h2 className="interview">
              {" "}
              What is your greatest weakness?
            </h2>
          </div>

          <div className="text hidden" />
          <br />

          <div className="flex-right">
            <div className='interview'>
              Title:
              <input 
                className='title-input'
                placeholder='Enter Title of Recording'
                type="text" 
                onChange={this.updateName} 
                value={this.state.name} />
            </div>
            <button className="record-button" onClick={this.handleSpeech}>
              {buttonText}
            </button>
          </div>

          <form onSubmit={this.handleSubmit}>
            {this.renderErrors()}
            <div>
              <textarea className="text-input" value={this.state.text} onChange={this.updatetext} />
            </div>

            <div className="flex-right">
              <button className="hidden" />
              <div>
              <button className='grammar-button' onClick={() => this.speak(this.state.text)}>Read Text</button>
              <input className="grammar-button" type="submit" value="Check Grammar" />
              </div>
            </div>
          </form>

          
          <div>
            <h3> Number of errors: {numErros} </h3>
            {this.renderLastCorrect()}
          </div>
        </div>
      </div>;  
  }
}

export default withRouter(GrammarForm);
