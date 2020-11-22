import React, { Component } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import {
  Vector as VectorSource,
XYZ as XYZSource,
} from "ol/source";

import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import base from "../../data/fetes.json";
//marker
import "../../data/marker.png";

export default class points_map extends Component {
 
  componentDidMount() {
    // carte + vue centrée sur l'ile-de-france
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZSource({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],

      view: new View({
        center: fromLonLat([2.3582602, 48.85]),
        zoom: 9.5,
      }),
    });

    //Creation et ajout du cercle sur paris
    let gpsarrays = base.map((data) => ({
      lat: data.geometry.coordinates[0],
      lon: data.geometry.coordinates[1],
    }));

    gpsarrays.map((data) => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([data.lat, data.lon])),
      });

      const vectorSource = new VectorSource({
        features: [marker],
      });

      const markerVectorLayer = new VectorLayer({
        source: vectorSource,
      });
      map.addLayer(markerVectorLayer);
    });
  }
  render() {
    const style_map = {
      height: "400px",
   
    };

    let villes = base.map(
      (data) => data.fields.adresse_administrative_ville_du_tiers_beneficiaire
    );

    console.log(villes);

    return (

        <div>
          <div>
            <div id="map" style={style_map}></div>
          </div>
        </div>

    );
  }
}
