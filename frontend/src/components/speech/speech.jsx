import React from 'react';



class Speech extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            stream: false
        };

        this.transcript = "";
    }

    

    handleSubmit(e) {
        e.preventDefault();
        let SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (this.state.stream) {
            // debugger
            this.setState({ stream: false });
            this.recognition.stop();
            this.recognition.removeEventListener("end", this.recognition.start);
            this.recognition = null;
                debugger
                console.log("advxcawbsDv"+this.transcript)
            this.props.createSpeech({
                user: this.props.currentUser.id,
              text: this.transcript
            });
            this.transcript = "";

            let children = Array.from(document.querySelectorAll(".text > p"));
            children.forEach(child => {
                child.parentNode.removeChild(child);
            });
        } else {
            debugger
            this.setState({ stream: true });

            this.recognition = new SpeechRecognition();
            this.recognition.interimResults = true;

            const texts = document.querySelector(".text");
            console.log(texts)
            let p = document.createElement("p");
            texts.appendChild(p);

            this.recognition.addEventListener("result", e => {
                console.log(e)
                const transcript = Array.from(e.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join("");

                p.textContent = transcript;
                if (e.results[0].isFinal) {
                    this.transcript += p.textContent + ". ";

                    p = document.createElement("p");
                    texts.appendChild(p);
                }
            });

            this.recognition.start();
            this.recognition.addEventListener("end", this.recognition.start);
        }
    }

    render() {
        let buttonText = this.state.stream ? "Stop" : "Record";
        return (
            <div>
                    <h1>Record Conversation</h1>
                    <div className="text">
                    
                    
                    </div>
                    <button onClick={this.handleSubmit}>
                        {buttonText}
                    </button>
                </div>
           
        );
    }
}

export default Speech;