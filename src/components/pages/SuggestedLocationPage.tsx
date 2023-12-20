import Button from '@mui/joy/Button';
import {TCoordinate, TSectorLocation} from "../common/TWorldSector.tsx";
import {Coordinate} from "ol/coordinate";
import * as ol from "ol";
import {Tile} from "ol/layer";
import {OSM} from "ol/source";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {TEvent} from "../common/events.tsx";
import {getAdriaMiddle, getCoordConverter} from "../../helpers/maphelpers/server-location-helper.ts";
import {drawMarker, drawRectangle, getAdriaSize} from "../../helpers/maphelpers/shape-drawer.ts";
import "../../assets/css/suggested-notification.scss"
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import getSectorName from "../../helpers/sectorhelper.ts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import evApi from "../../services/api-events.ts";

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


async function setLocation(eventId: number, coord: TCoordinate) {
    return await evApi.setEventLocation(eventId, coord);
}

async function cancelEvent(eventId: number) {
    return await evApi.cancelEvent(eventId);
}

export default function SuggestedLocationPage() {
    const mapDiv = useRef(null);
    const navigate = useNavigate()
    const {state} = useLocation()
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

    if (!state) {
        window.location.href = ("/")
    }

    const suggestedLocation: TSectorLocation = state.suggestedLocation;
    const event: TEvent = state.event;

    function getImage() {
        import(`../../assets/img/${event.category.categoryId}.png`)
            .then((module) => {
                setImgSrc(module.default);
            })
            .catch((error) => {
                console.error('Error loading image:', error);
            });
    }

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
        mapObject.getView().setCenter(markerLocation);
        const marker = drawMarker(mapObject, markerLocation);

        getImage();

        return () => {
            mapObject.setTarget();
            mapObject.removeLayer(marker);
        }
    }, [suggestedLocation]);


    function redirectToHome() {
        navigate("/");
    }

    async function handleSubmit(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, accepted: boolean) {
        e.preventDefault();
        if (accepted) {
            setLocation(event.id, suggestedLocation.coordinate).then(() => redirectToHome()).catch(err => console.log(err));
        } else {
            cancelEvent(event.id).then(() => redirectToHome());
        }
    }

    return (
        <div className="location-popup">
            <h2>A location has been suggested for your event coming up soon!</h2>
            <div className={"info"}>
                <div className={"map"}>
                    <div ref={mapDiv} className={"ol-map"}/>
                </div>
                <div className={"bottom-container"}>
                    {renderEvent(event)}
                    <div className={"image-container"}>
                        <img src={imgSrc} alt={"Image for: " + event.category.name}/>
                    </div>
                </div>
            </div>

            <form className="form-group" onSubmit={e => e.preventDefault()}>
                <Button type="submit" onClick={(event) => handleSubmit(event, true)}>Accept Location</Button>
                <Button type="submit" color={"danger"} onClick={(event) => handleSubmit(event, false)}>Cancel
                    Event</Button>
            </form>
        </div>
    );
}

function renderEvent(event: TEvent) {
    return <div className={"suggested-event-details"}>
        <h3>{event.name}</h3>
        <ul>
            <li><PersonIcon/>{event.organiser.firstName} {event.organiser.lastName}</li>
            <li><LocationOnIcon/>{getSectorName(event.sector.id)}</li>
            <li><CheckCircleIcon/>{event.amountOfPeople}</li>
            <li>{event.description}</li>
        </ul>
    </div>
}
