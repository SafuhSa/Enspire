import React from "react";
import "./main_page.css";

class MainPage extends React.Component {
  render() {
    return <div className="main-page">  

        <div className="splash-bar">
          <h1>Speak with confidence.</h1>
        </div>

        <div className="splash-middle">
          <div className="speech-bubble">
            <i className="far fa-comments" />
          </div>
          <div className="splash-description">
            <p>
              For non-native speakers, interviews and conversations come
              with a unique set of challenges. Enspire is designed to help
              you take the first steps towards navigating these challenges
              confidently.
            </p>
          </div>
        </div>
        <div className="splash-bottom">
          <div>
          <i className="fas fa-globe-asia"></i>
          <br /><br />
            Real-time grammar correction. 
            Know instantly when you've made a mistake.
          </div>

          <div>
            <i className="fas fa-globe-africa" />
            <br/><br/>
            Learn stuff. Lorem ipsum. Ladida. 
            My name is Inigo Montoya. 
            This will eventually discuss some product feature.
          </div>

          <div>
            <i className="fas fa-globe-americas"></i>
            <br/><br/>
              Hundreds of prompts in topics ranging 
              interviews to casual conversation
          </div>
        </div>
        <footer className='foot'>Copyright &copy; 2019 Enspire</footer>
      </div>;
  }
}

export default MainPage;
