import * as ol from "ol"
import {fromLonLat} from "ol/proj";
import {OSM} from "ol/source";
import {Tile, Vector} from "ol/layer";
import {useState} from "react";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Icon, Style} from "ol/style";


function MapPage(){

    const testLocations = [
        {
            coordinates : [12.060, 45.0528]
        },
        {
            coordinates : [11.000, 45.0000]
        }
    ]

    const [visible, setVisible] = useState(true);

    function eventHandler(){

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
        {visible && <button onClick={eventHandler}>show map</button>}
        <div id="map" style={{ width: '100%', height: '40rem' }}></div>;
    </>


}


    //



export default MapPage;


