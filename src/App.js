import React, { Component } from "react";
import "./App.css";
import Bar from "./components/Chart/barChart";
import Pie from "./components/Chart/pieChart";
import Line from "./components/Chart/lineChart";
import ParisMap from "./components/Map/paris_map";
import PointsMap from "./components/Map/points_map";
import HeatMap from "./components/Map/heat_map";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <div>
            <h1 className="main_title">
              Projet sur les thèmes des graphiques et de la géolocalisation
            </h1>
            <h2 className="secondary_title">
              Aide aux festivals de musiques actuelles et amplifiees 2011-2013
            </h2>
            <div>
              <span className="source_style">Source :</span>
              <a
                href="https://www.data.gouv.fr/fr/datasets/aide-aux-festivals-de-musiques-actuelles-et-amplifiees-2011-2013-idf/"
                target="_blank"
                rel="noopener noreferrer"
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
          <ParisMap />
        </div>
        <div>
          <PointsMap />
        </div>
        <div>
          <HeatMap />
        </div>
      </div>
    );
  }
}

export default App;
