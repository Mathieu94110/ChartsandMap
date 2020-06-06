import React, {Component} from 'react';
import './App.css';
import Bar from './components/Chart/barChart';
import Pie from "./components/Chart/pieChart";
import Line from './components/Chart/lineChart';
import Paris_map from './components/Map/paris_map';
import Points_map from "./components/Map/points_map";
class App extends Component {
  constructor() {
    super();
  
  }


    render() {
      return (
        <div className="App">
          <div>
            <div>
              <h1 Style={"color:black"}>ChartJs</h1>
            </div>
            <div>
              <Bar data={this.props.chartData} />
              <Pie data={this.props.chartData} />
              <Line data={this.props.chartData} />
            </div>
            <Paris_map />
          </div>
          <div>
         <Points_map/>
          </div>
        </div>
      );
    }
 
  
}

export default App;
