import React, { Component } from "react";
import "ol/ol.css";
import { Map, View, layer, Layers } from "ol";
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
//
import {
  ScaleLine,
  ZoomSlider,
  MousePosition,
  OverviewMap,
  defaults as DefaultControls,
} from "ol/control";
import Feature from "ol/Feature";
import base from "../../data/fetes.json";
import image from "../../data/marker.png";
//import Marker from "../../data/marker.png";

// End Openlayers imports
// End Openlayers imports
// GIS coordinates for absolute center of Parislg 2.3522,lat 48.8566

class Paris_map extends Component {
  constructor(props) {
    super(props);
  }

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
    const style = {
      width: "80%",
      margin: "auto",
      height: "400px",
      backgroundColor: "#cccccc",
      marginBottom: "100px",
    };

    // travail sur affichage des villes avec budgets
    //on stoque toutes les villes dans villes


    //let coordonnées = base.map((data) =>
    //)
    // on devrait utiliser cela pour la liste de departements au lieu de le coder en dur pour qu'il reste adaptable

    var depts = new Array(100);
    for (var i = 0; i < 100; i++) {
      depts[i] = i + 1; //This populates the array.  +1 is necessary because arrays are 0 index based and you want to store 1-100 in it, NOT 0-99.
    }

    for (var i = 0; i < depts.length; i++) {
      console.log(depts[i]); //This prints the values that you stored in the array
    }

    let data = base.filter(
      (data) =>
        data.fields
          .adresse_administrative_code_departement_du_tiers_beneficiaire ==
        depts
    );

    console.log(data);

    return (
      <container>
        <h1>Openlayers</h1>
        <div item xs={12}>
          <div>
            <div id="map" style={style}></div>
          </div>
        </div>
      </container>
    );
  }
}

export default Paris_map;
