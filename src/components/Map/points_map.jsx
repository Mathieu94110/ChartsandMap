import React, { Component } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat, getPointResolution } from "ol/proj.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import {
  Vector as VectorSource,
  OSM as OSMSource,
  XYZ as XYZSource,
  TileWMS as TileWMSSource,
} from "ol/source";
//marker
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";

import Feature from "ol/Feature";
import base from "../../data/fetes.json";
import "../../data/marker.png";
import { getCenter } from "ol/extent";

import image from "../../data/marker.png";

export default class points_map extends Component {
  constructor(props) {
    super(props);
  }
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
    let gpsarrays = base.map((data) => ({ 'lat': data.geometry.coordinates[0], 'lon': data.geometry.coordinates[1] }));


gpsarrays.map((data)=>{
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
})




  
  }
  render() {
    let villes = base.map(
      (data) => data.fields.adresse_administrative_ville_du_tiers_beneficiaire
    );

    console.log(villes);

  

    return (
      <div style={{ height: "600px" }}>
        <h1>Points Map</h1>
        <div id="map"></div>
      </div>
    );
  }
}