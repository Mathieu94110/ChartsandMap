import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import base from '../../data/fetes.json';


class barChart extends Component {
    constructor(props) {
      super(props);
      
    let departements = [77, 78, 91, 92, 93, 94, 95, 75];

    let listemontant = [];

    for (let departement of departements) {
      let data = base.filter(
        (data) =>
          data.fields
            .adresse_administrative_code_departement_du_tiers_beneficiaire ==
          departement
      );

      let sommeMontant = data.reduce(
        (precedent, actuel) => precedent + actuel.fields.montant_vote,
        0
      );
      listemontant.push(sommeMontant);
    }

    let listeannees = ["2011", "2012", "2013", "2014"];
    let listemontant2 = [];

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
        barChart: {
     
          labels: departements,
          datasets: [
            {
              label: "Montant en euros",
              data: listemontant,
              backgroundColor: [
                "rgba(255,99,132,0.6)",
                "rgba(54,162,235,0.6)",
                "rgba(75,192,192,0.6)",
                "rgba(153,99,255,0.6)",
                "rgba(255,159,64,0.6)",
                "rgba(255,99,132,0.6)",
                "rgba(54,162,235,0.6)",
                "rgba(255,99,132,0.6)",
              ],
            },
          ],
        },
      };

  }
  
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition:'right'
}

    render() {
      return (
        <div className="chart">
          <h2>Avec utilisation de l'api ChartJs</h2>
          <Bar
            data={this.state.barChart}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Distribution des supports financier par département",
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

export default barChart;