import React from "react";
import { withRouter } from "react-router-dom";
import "./grammar.css"
import conversation from './conversation';
import interview from './interview';

class GrammarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      prevs: "",
      idvView: "",
      stream: false,
      prompt: ""
    };

    this.topic = 'Conversation'
    this.prompt = conversation;

    this.transcript = "";
    this.handleSpeech = this.handleSpeech.bind(this);

    this.speaker = new SpeechSynthesisUtterance();
    this.speaker.lang = "en-US";
    this.speaker.text = "Welcome To Enspire";
    speechSynthesis.speak(this.speaker);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.updatetext = this.updatetext.bind(this);
    this.renderLastCorrect = this.renderLastCorrect.bind(this);
    this.handlePormpt = this.handlePormpt.bind(this);
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

  componentWillMount() {
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

  speak(text) {
    this.speaker.text = text;
    speechSynthesis.speak(this.speaker);
  }

  handlePormpt() {
    let idx = (this.prompt.indexOf(this.state.prompt) + 1) % this.prompt.length;
    let text = this.prompt[idx];
    this.setState({ prompt: text });
  }

  changeTopic() {
    if (this.prompt[2] === interview[2]) {
      this.prompt = conversation
      this.topic = "Conversation"
      this.speak("Topic changed to Conversation");
    } else {
      this.prompt = interview
      this.topic = "Interview";
      this.speak("Topic changed to Interview");
    }
    this.setState({prompt: ''})
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

    return (
      <div className="grammar-page">
        <div>
          <div className="floater">
            <button className="record-button" onClick={this.changeTopic.bind(this)}>
              Change Topic
            </button>
            <h1>{this.topic}</h1>
          </div>

          <div className="floater">
            <button className="record-button" onClick={this.handlePormpt.bind(this)}>
              New Prompt
            </button>
            {this.speak(this.state.prompt)}
            <h2>{this.state.prompt}</h2>
          </div>

          <div className="text" />
          <button className="record-button" onClick={this.handleSpeech}>
            {buttonText}
          </button>
        </div>

        <div>
          <h3>TEXT CORRECTION</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderErrors()}
            <div>
              <textarea value={this.state.text} onChange={this.updatetext} />
            </div>
            <input type="submit" value="Check Grammar" />
          </form>
          <button onClick={() => this.speak(this.state.text)}>Read</button>
          <div>
            <h3> Number of errors: {numErros} </h3>
            {this.renderLastCorrect()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(GrammarForm);
