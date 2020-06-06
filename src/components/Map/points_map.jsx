import React, { Component } from 'react';
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
import { getCenter } from 'ol/extent';

import image from "../../data/marker.png";


export default class points_map extends Component {
                 constructor(props) {
                   super(props);
                 }
    componentDidMount() {
          const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new XYZSource({
                        url:
                            "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    }),
                }),
            ],
            // retourne la vue sur l'ile-de-france
            view: new View({
                center: fromLonLat([2.3582602, 48.85]),
                zoom: 9.5,
            }),
        });

    }
  render() {
      

    let villes = base.map(
      (data) => data.fields.adresse_administrative_ville_du_tiers_beneficiaire
    );

    console.log(villes);

    let gpsarrays = base.map((data) => data.geometry.coordinates[1]);

    console.log(gpsarrays);

    let singlegps = gpsarrays.map(data => data[0, 1])

    console.log(singlegps);
    let testgps = [];
    base.forEach(data => {
      // testgps.push(data.geometry.coordinates[1] && data.fields.wgs84[1]);
      testgps.push(data.geometry.coordinates[1]);
      testgps.push(data.fields.wgs84[1]);
    });

    console.log(testgps);
          
                   return (
                     <div style={{ height: "600px" }}>
                       <h1>Points Map</h1>
                       <div id="map" ></div>
                     </div>
                   );
                 }
               }
