import React from "react";
import { withRouter } from "react-router-dom";
import "./history.css"

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { idvView: ''};




        this.renderAllCorrections = this.renderAllCorrections.bind(this);
        this.renderIndividual = this.renderIndividual.bind(this);
    }

    componentWillMount() {
        this.props.fetchCorrections();
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
        this.state.idvView="";
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
                <div key={i}>
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
    
        return <div className='history-page'>
            ------------++++++++++++++------
            History: {this.renderAllCorrections()}
            {this.renderIndividual()}

        </div >
    }
}

export default withRouter(HistoryPage);
