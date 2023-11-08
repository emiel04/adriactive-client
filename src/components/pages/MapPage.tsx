import {useEffect, useRef} from "react";
import * as ol from "ol";
import {fromLonLat} from "ol/proj";
import {OSM} from "ol/source";
import {Tile} from "ol/layer";
import "../../assets/css/map.css"

function MapPage() {
    const mapDiv = useRef(null);
    useEffect(() => {
        const mapObject = new ol.Map({
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

        if (mapDiv.current) {
            mapObject.setTarget(mapDiv.current);
        }

        return () => {
            mapObject.setTarget();
        };
    }, []);

    return (
        <div ref={mapDiv} id="map" className={"ol-map"} />
    );

}

export default MapPage;