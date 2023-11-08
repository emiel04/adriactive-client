import {useState, useEffect} from "react";
import * as ol from "ol";
import {fromLonLat} from "ol/proj";
import {OSM} from "ol/source";
import {Tile} from "ol/layer";

function MapPage() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        showMapHandler();
    }, []);

    function showMapHandler() {
        removeMap();

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

    return (
        <div id="map" style={{width: '100%', height: '40rem', display: visible ? 'block' : 'none'}} />
    );

}

    function removeMap() {
        return <div/>
    }

export default MapPage;