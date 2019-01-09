import React from "react";
import { withRouter } from "react-router-dom";
import "./history.css"
import BarChart from "react-bar-chart";
var data = [];

const margin = { top: 10, right: 20, bottom: 60, left: 40 };

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { idvView: ''};
        this.renderAllCorrections = this.renderAllCorrections.bind(this);
        this.renderIndividual = this.renderIndividual.bind(this);
        this.populateData = this.populateData.bind(this)
        this.displaymistakes = this.displaymistakes.bind(this)
    }
    populateData() {
        var corrections = this.props.allCorrections;
        data = []
        if (!corrections) {
            return "no Date for you"
        } else {
            for (var i = 0; i < corrections.length; i++) {  
                var date = new Date(corrections[i].date).toDateString();
                var numErrors = corrections[i].correcttext.length
                for (var j = 0; j < data.length; j++) {
                    if (data[j].text === date) {
                        
                        if (corrections[i].correcttext === undefined){
                        }else{
                        numErrors = corrections[i].correcttext.length + data[j].value
                        }
                    }
                }
            var obj = { text: date, value: numErrors }
            data.push(obj)
            }
        }
        return <div className='bar-chart' style={{ width: "50%" }}>
            <BarChart className="bar-group" width={440} height={300} margin={margin} data={data} onBarClick={(element, id) => this.displaymistakes(element.text)} />
        </div>
  
    }


    componentDidMount() {
        this.props.fetchCorrections();
        
    }
    displaymistakes(inp){
        if (!this.props.allCorrections) return null;
        let result = [];
        for (let i = 0; i < this.props.allCorrections.length; i++) {
            const errs = this.props.allCorrections[i];
            const date = new Date(errs.date).toDateString();
            const name = errs.name
            
            if(date === inp){
                result.push(
                    <div className='history-list' key={i}>
                        {name}
                        <button onClick={() => this.setState({ idvView: errs })}>
                            {date.toLocaleString()}
                        </button>
                    </div>
                );
            }
        }
        return result
    }

    renderIndividual() {
        if (!this.state.idvView) return null;
        let result = [];
      
        result.push(<div className="text-errors" key={"text"}>
            <p className="text-selection">Text Selection: </p>
            <p className="selected-text">
              {this.state.idvView.wrongtext}
            </p>
            <br />
            <br />
          </div>);
        for (let i = 0; i < this.state.idvView.correcttext.length; i++) {
            const errs = this.state.idvView.correcttext[i];
            const bad = errs.bad;
            const type = errs.type;
            const better = errs.better.slice(0, 2).join(" , ");

            result.push(<div key={i}>
                <ul className="error-list">
                  <li className="error-title">Error {i + 1}</li>
                    <li><span className='bold'>Type:</span> {type} </li>
                    <li><span className='bold'>Mistake:</span> {bad}</li>
                    <li><span className='bold'>Fix:</span> {better}</li>
                </ul>
                <br />
                <br />
              </div>);
        }
        this.state.idvView = '';
        return result;
    }


    renderAllCorrections() {
        if (!this.props.allCorrections) return null
        let result = [];
   
        for (let i = 0; i < this.props.allCorrections.length; i++) {
            const errs = this.props.allCorrections[i];
            const date = new Date(errs.date).toDateString();
            const name = errs.name
            result.push(<div className="history-list" key={i}>
                <div 
                    className='button-flex' 
                    onClick={() => this.setState({idvView: errs})}>
                  <h2 className="session-date">
                    {date.toLocaleString()}{": "}
                  </h2>
                  <h3 className="session-title">{name}</h3>
                </div>
              </div>);
        }
        return result;
    }

    render() {
            
        return <div className="history-page">
            <div className="history-flex">
              <div className="left-side">
                <div>
                  <h1 className="history-title">Errors Over Time: </h1>
                  {this.populateData()}
                </div>

                <div className="history-list">
                  <h1 className="history-title">Previous Sessions: </h1>
                  {this.renderAllCorrections()}
                </div>
              </div>

              <div className="right-side">
                    <h1 className="history-title">Selected Errors: </h1>
                {this.renderIndividual()}
              </div>
            </div>
          </div>;
    }
}

export default withRouter(HistoryPage);
