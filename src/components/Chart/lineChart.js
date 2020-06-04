import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import base from "../../data/fetes.json";

class lineChart extends Component {
  constructor(props) {
    super(props);
    

    let departements = [77, 78, 91, 92, 93, 94, 95, 75];
    let listemontant = [];
    let listemontant2 = [];
    let listeannees = ["2011", "2012", "2013", "2014"];

    for (let departement of departements) {
      let data = base.filter(
        (data) =>
          data.fields
            .adresse_administrative_code_departement_du_tiers_beneficiaire ==
          departement
      );
      // avec la fonction reduce
      let sommeMontant = data.reduce(
        (precedent, actuel) => precedent + actuel.fields.montant_vote,
        0
      );
      listemontant.push(sommeMontant);
    }
    for (let annee of listeannees) {
      let data = base.filter(
        (data) => data.fields.exercice_de_la_premiere_decision == annee
      );
      let sommeMontant = data.reduce(
        (precedent, actuel) => precedent + actuel.fields.montant_vote,
        0
      );
      listemontant2.push(sommeMontant);
    }

    this.state = {
      LineChart: {
        labels: listeannees,
        datasets: [
          {
            label: "Distribution des supports financiers par année",
            data: listemontant2,
            fill: false,
            lineTension: 0.2,
            borderColor: "red",
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          text: "Line Chart",
          display: true,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  }
  static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: "right",
      };

      render() {
        return (
          <div className="chart">
            <Line
              data={this.state.LineChart}
              options={{
                title: {
                  display: this.props.displayTitle,
                  text: "Distribution des supports financier par année",
                  fontSize: 15,
                },
                legend: {
                  display: this.props.displayLegend,
                  position: "right",
                },
              }}
            />
          </div>
        );
      }
    }
  
export default lineChart;
