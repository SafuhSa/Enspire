import React from "react";
import "./main_page.css";
import { Link } from "react-router-dom";

class MainPage extends React.Component {
  render() {
    return <div className="main-page">
        <div className="splash-bar">
          <h1>Speak with confidence.</h1>
        </div>

        <div className="splash-middle">
          <div className="speech-bubble">
            {/* <i className="far fa-comments" /> */}
          <i className="fas fa-globe-africa" />
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
            {/* <i className="fas fa-globe-asia icon" /> */}
            <i className="fab fa-youtube icon"></i>
            <br />
            <br />
            Video walkthrough coming soon!
          </div>

          <div>
            {/* <i className="fas fa-globe-africa" /> */}
            <Link to="https://github.com/SafuhSa/Enspire">
              <i className="fab fa-github icon" />
            </Link>
            <br />
            <br />
            Hosted on Github. Check out our code <Link to="https://github.com/SafuhSa/Enspire" className='hoverable'>
              HERE
            </Link>
          </div>

          <div>
            {/* <i className="fas fa-globe-americas" /> */}
            <i className="fab fa-linkedin icon" />
            <br />
            <br />
            Check us out on Linked In:
            <p className="coders hoverable">
              &bull; &nbsp;
              <Link to="https://www.linkedin.com/in/safuh-alsarayji-601364173/">
                Safuh Alsarayji
              </Link>
            </p>
            <p className="coders hoverable">
              &bull; &nbsp;
              <Link to="https://www.linkedin.com/in/jayalakshmi-dammalapati-2509/">
                Jayalakshmi Dammalapati
              </Link>
            </p>
            <p className="coders hoverable">
              &bull; &nbsp;
              <Link to="https://www.linkedin.com/in/erica-edelman-29422a68/">
                Erica Edelman
              </Link>
            </p>
          </div>
        </div>
        <footer className="foot">Copyright &copy; 2019 Enspire</footer>
      </div>;
  }
}

export default MainPage;
