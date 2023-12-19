import Button from '@mui/joy/Button';
import {TCoordinate} from "../common/TWorldSector.tsx";
import {Coordinate} from "ol/coordinate";
import {fromLonLat} from "ol/proj";
import * as ol from "ol";
import {Tile} from "ol/layer";
import {OSM} from "ol/source";
import {useEffect, useRef} from "react";
import evApiEvents from "../../services/api-events.ts";
import {useNavigate} from "react-router";
import axios, {CancelTokenSource} from "axios";

function createMapObject(center: Array<number>) {
    return new ol.Map({
        layers: [
            new Tile({
                source: new OSM()
            })
        ],
        view: new ol.View({
            center: center,
            zoom: 15,
        }),
        controls: []
    });
}

type SuggestedLocationPageProps = {
    suggestedLocation: TCoordinate
}


export default function SuggestedLocationPage({suggestedLocation}: SuggestedLocationPageProps) {
    const mapDiv = useRef(null);
    const navigate = useNavigate();
    const evReq: CancelTokenSource = axios.CancelToken.source();


    useEffect(() => {
        const center: Coordinate = fromLonLat([suggestedLocation.x, suggestedLocation.y]);
        const mapObject = createMapObject(center);
        if (mapDiv.current) {
            mapObject.setTarget(mapDiv.current);
        }
    }, [suggestedLocation]);


    function handleSubmit(event: { preventDefault: () => void; }, accepted: boolean) {
        event.preventDefault();

        const coordinates = {
            x: suggestedLocation.x,
            y: suggestedLocation.y,
        };

        if (accepted) {
            evApiEvents.editEvent(/* eventid */, coordinates, evReq.token).then(r => console.log(r));
        } else {
            evApiEvents.cancelEvent(/* eventid */, evReq.token).then(r => console.log(r));
        }

        navigate('/app/home');
    }

    return (
        <div className="location-popup">
            <h2>Suggested Location</h2>
            <div ref={mapDiv} id="map" className={"ol-map"}/>
            <form className="form-group">
                <Button type="submit" onClick={(event) => handleSubmit(event, true)}>Accept Location</Button>
                <Button type="submit" onClick={(event) => handleSubmit(event, false)}>Cancel Event</Button>
            </form>
        </div>
    );
}

