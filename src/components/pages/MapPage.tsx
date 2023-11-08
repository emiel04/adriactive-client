import * as ol from "ol"
import {fromLonLat} from "ol/proj";
import {OSM} from "ol/source";
import {Tile} from "ol/layer";
import {useState} from "react";

function MapPage(){

    const [visible, setVisible] = useState(true);

    function showMapHandler(){
        setVisible((prev) => !prev);
        new ol.Map({
        target: 'map',
        layers: [
            new Tile({
                source: new OSM()
            })
        ],
        view: new ol.View({
            center: fromLonLat([12.060, 45.0528]),
            zoom: 15
        })
        });
    }
    return <>
        {visible && <button onClick={showMapHandler}>show map</button>}
        <div id="map" />
    </>


}

export default MapPage;


