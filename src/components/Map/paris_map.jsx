import React, { Component } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import {
  Vector as VectorSource,
XYZ as XYZSource,
} from "ol/source";
//marker
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import Feature from "ol/Feature";
import base from "../../data/fetes.json";
import image from "../../data/marker.png";
// GIS coordinates for absolute center of Parislg 2.3522,lat 48.8566

class Paris_map extends Component {


  componentDidMount() {
    // Créer une instance de carte

    const map = new Map({
      // prend les données a afficher
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZSource({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      // retourne la vue sur l'ile-de-france
      view: new View({
        center: fromLonLat([2.3582602, 48.85]),
        zoom: 9.5,
      }),
    });

    const marker = new Feature({
      geometry: new Point(fromLonLat([2.3821109, 48.8457773])),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          color: "#8959A8",
          crossOrigin: "anonymous",
          src: image,
          imgSize: [50, 50],
        }),
      })
    );

    const vectorSource = new VectorSource({
      features: [marker],
    });

    const markerVectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(markerVectorLayer);
  }

  render() {
    const style_map = {
      height: "400px",
    };

    var depts = new Array(100);
    for (var i = 0; i < 100; i++) {
      depts[i] = i + 1; //This populates the array.  +1 is necessary because arrays are 0 index based and you want to store 1-100 in it, NOT 0-99.
    }

    for (i = 0; i < depts.length; i++) {
      console.log(depts[i]); //This prints the values that you stored in the array
    }

    let data = base.filter(
      (data) =>
        data.fields
          .adresse_administrative_code_departement_du_tiers_beneficiaire ===
        depts
    );

    console.log(data);

    return (
<div>
        <h2>Avec utilisation de l'Api OpenLayers</h2>
        <div>
          <div>
            <div id="map" style={style_map}></div>
          </div>
        </div>
</div>
    );
  }
}

export default Paris_map;
