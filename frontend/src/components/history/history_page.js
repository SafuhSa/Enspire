import React from "react";
import { withRouter } from "react-router-dom";
import "./history.css"
import BarChart from "react-bar-chart";
var data = [];

const margin = { top: 50, right: 20, bottom: 60, left: 40 };

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { idvView: ''};
        this.renderAllCorrections = this.renderAllCorrections.bind(this);
        this.renderIndividual = this.renderIndividual.bind(this);
        //  this.state = { width: 500 };
        this.handleBarClick = this.handleBarClick.bind(this)
        this.populateData = this.populateData.bind(this)
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

                for (var i = 0; i < data.length; i++) {

                    if (data[i].text === date) {
                        
                        // debugger
                        console.log(corrections[i])
                        if (corrections[i].correcttext === undefined){

                        }else{
                        numErrors = corrections[i].correcttext.length + data[i].value
                        }


                    }
                }
                var obj = { text: date, value: numErrors }

                data.push(obj)
            }
        }
        return <div style={{ width: "50%" }}>
            <BarChart className="bar-group" width={500} height={500} margin={margin} data={data} onBarClick={this.handleBarClick} />
        </div>
    }


    componentDidMount() {
        this.props.fetchCorrections();
        
    }
    handleBarClick(element, id) {
        // debugger
        // this.setState({ idvView: errs });
    //    this.renderIndividual()
    }

    renderIndividual() {
        if (!this.state.idvView) return null;

        let result = [];
        debugger
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
        // this.setState({idvView: ''})
        this.state.idvView = '';
        return result;
    }


    renderAllCorrections() {
        if (!this.props.allCorrections) return null
        let result = [];
   
        for (let i = 0; i < this.props.allCorrections.length; i++) {
            const errs = this.props.allCorrections[i];
            const date = new Date(errs.date);
            const name = errs.name
            result.push(
                <div className='history-list' key={i}>
                    {name}
                    <button onClick={() => this.setState({ idvView: errs })}>
                        {date.toLocaleString()}
                    </button>
                </div>
            );
        }
       
       
        return result;
    }

    render() {
       
    
        return <div className="history-page">
            <div className="history-flex">
                <div className='history-list'>
                    <h1 className="history-title">Previous Sessions: </h1>
                    {this.renderAllCorrections()}
                </div>
                {this.populateData()}
              {this.renderIndividual()}
            </div>
          </div>;
    }
}

export default withRouter(HistoryPage);
