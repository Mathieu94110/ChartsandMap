import React, {Component} from 'react';
import './App.css';
import Bar from './components/Chart/barChart';
import Pie from "./components/Chart/pieChart";
import Line from './components/Chart/lineChart';
import Paris_map from './components/Map/paris_map';
import Points_map from "./components/Map/points_map";
import Heat_map from './components/Map/heat_map';

class App extends Component {
  constructor() {
    super();
  
  }


    render() {
      return (
        <div className="App">
          <div>
            <div>
              <h1 Style={"color:black"}>
                Projet sur les thèmes des graphiques et de la géolocalisation
              </h1>
              <h2 style={{ color: "cyan" }}>
                Aide aux festivals de musiques actuelles et amplifiees 2011-2013
              </h2>
              <div>
                <span style={{ fontWeight: "bold" }}>Source :</span>
                <a
                  href="https://www.data.gouv.fr/fr/datasets/aide-aux-festivals-de-musiques-actuelles-et-amplifiees-2011-2013-idf/"
                  target="_blank"
                >
                  Suivre le lien
                </a>
              </div>
            </div>
            <div>
              <Bar data={this.props.chartData} />
              <Pie data={this.props.chartData} />
              <Line data={this.props.chartData} />
            </div>
            <Paris_map />
          </div>
          <div>
            <Points_map />
          </div>
          <div>
            <Heat_map />
          </div>
        </div>
      );
    }
 
  
}

export default App;
