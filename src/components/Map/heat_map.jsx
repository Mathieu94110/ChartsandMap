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
//rajout 
import HeatData from "./data.geojson"
import KML from "ol/format/KML";
import { Heatmap as HeatmapLayer } from "ol/layer";
import Stamen from "ol/source/Stamen";
import file from "./data.kml"
import { getCenter } from "ol/extent";

import image from "../../data/marker.png";

export default class heat_map extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // carte + vue centrée sur l'ile-de-france

    var vector = new HeatmapLayer({
      source: new VectorSource({
        url: file,
        format: new KML({
          extractStyles: false,
        }),
      }),
      blur: parseInt(10, 10),
      radius: parseInt(10, 10),
      weight: function (feature) {
        // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
        // standards-violating <magnitude> tag in each Placemark.  We extract it from
        // the Placemark's name instead.
        var name = feature.get("name");
        var magnitude = parseFloat(name.substr(2));
        return magnitude - 5;
      },
    });

    var raster = new TileLayer({
      source: new Stamen({
        layer: "toner",
      }),
    });

    new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }
  render() {
    return (
      <div style={{ height: "600px" }}>
        <h1>Points Map</h1>
        <div id="map"></div>
      </div>
    );
  }
}
