import * as ol from "ol"
import {fromLonLat} from "ol/proj";
import {OSM} from "ol/source";
import {Tile} from "ol/layer";

function MapPage(){
    function eventHandler(event){
        event.target.disabled = true;
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
        <button onClick={eventHandler}>show map</button>
        <div id="map" style={{ width: '100%', height: '40rem' }}></div>;
    </>

}
export default MapPage;


