import Button from '@mui/joy/Button';
import {TSectorLocation} from "../common/TWorldSector.tsx";
import {Coordinate} from "ol/coordinate";
import * as ol from "ol";
import {Tile} from "ol/layer";
import {OSM} from "ol/source";
import {useEffect, useRef} from "react";
import {useLocation, useNavigate} from "react-router";
import axios, {CancelTokenSource} from "axios";
import {TEvent} from "../common/events.tsx";
import {getAdriaMiddle, getCoordConverter} from "../../helpers/maphelpers/server-location-helper.ts";
import {drawMarker, drawRectangle, getAdriaSize} from "../../helpers/maphelpers/shape-drawer.ts";

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

export type SuggestedLocationPageProps = {
    suggestedLocation: TSectorLocation,
    event: TEvent
}


export default function SuggestedLocationPage() {
    const mapDiv = useRef(null);
    const navigate = useNavigate()
    const {state} = useLocation()
    const evReq: CancelTokenSource = axios.CancelToken.source();
    const suggestedLocation: TSectorLocation = state.suggestedLocation;
    const event: TEvent = state.event;
    useEffect(() => {
        const center: Coordinate = getAdriaMiddle();
        const mapObject = createMapObject(center);
        if (mapDiv.current) {
            mapObject.setTarget(mapDiv.current);
        }
        const rectFeature = drawRectangle(mapObject, center, getAdriaSize(), getAdriaSize(), "transparent")
        const rectExtent = rectFeature.getGeometry()?.getExtent();
        const coordConverter = getCoordConverter(rectExtent || [0, 0, 0, 0])

        const markerLocation = coordConverter(suggestedLocation.coordinate.x, suggestedLocation.coordinate.y);
        const marker = drawMarker(mapObject, markerLocation);

        console.log(marker)
        return () => {
            mapObject.setTarget();
            mapObject.removeLayer(marker);
        }
    }, [suggestedLocation]);


    function handleSubmit(event: { preventDefault: () => void; }, accepted: boolean) {

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

