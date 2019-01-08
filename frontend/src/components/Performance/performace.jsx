import React from "react";
import BarChart from "react-bar-chart";
var data = [
    // { text: 'Man', value: 500 },
    // { text: 'Woman', value: 300 }
];

const margin = { top: 50, right: 20, bottom: 60, left: 40 };

 class Perforamce extends React.Component {
  
   constructor(props) {
     super(props);
    
    //  this.state = { width: 500 };
     this.handleBarClick = this.handleBarClick.bind(this)
     this.populateData = this.populateData.bind(this)
   }
   populateData(){

     var corrections = this.props.allCorrections;
     if(corrections.length === 0){
        return "no Date for you"
     }else{
            for(var i = 20;i<corrections.length;i++){
       var date = new Date(corrections[i].date).toDateString();

       var numErrors = corrections[i].correcttext.length
       
          for(var i = 0; i < data.length ;i++){
          
            if(data[i].text === date){

              numErrors = corrections[i].correcttext.length+data[i].value
             

            }
          }
       var obj = { text: date,value:numErrors}
      
            data.push(obj)
     }
    }
    //  return data;
   }
   
   componentDidMount() {
     window.onresize = () => {
       this.setState({ width: this.refs.root.offsetWidth });
     };
   }
   handleBarClick(element, id) {
     console.log(`The bin ${element.text} with id ${id} was clicked`);
   }
   render() {
      //  debugger
     this.populateData()
     return <div ref="root">
         <div style={{ width: "50%" }}>
           <BarChart className="bar-group" ylabel="mistakes" width={500} height={500} margin={margin}  data={data} onBarClick={this.handleBarClick} />
         </div>
       </div>;
   }
 }

 export default Perforamce;