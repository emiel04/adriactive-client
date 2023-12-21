import {useEffect, useRef, useState} from "react";
import {Coordinate} from "ol/coordinate";
import {createMapObject, getAdriaMiddle, getCoordConverter} from "../helpers/maphelpers/server-location-helper.ts";
import {drawMarker, drawRectangle, getAdriaSize} from "../helpers/maphelpers/shape-drawer.ts";
import {TEvent} from "./common/events.tsx";
import {TCoordinate} from "./common/world.tsx";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import getSectorName from "../helpers/sectorhelper.ts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface EventLocationInfoProps {
    event: TEvent;
    location: TCoordinate
}

export function EventLocationInfo({event, location}: EventLocationInfoProps) {
    const mapDiv = useRef(null);
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
    console.log(location)

    function getImage() {
        import(`../assets/img/${event.category.categoryId}.png`)
            .then((module) => {
                setImgSrc(module.default);
            })
            .catch((error) => {
                console.error('Error loading image:', error);
            });
    }

    useEffect(() => {
        const center: Coordinate = getAdriaMiddle();
        const mapObject = createMapObject(center, 16);
        if (mapDiv.current) {
            mapObject.setTarget(mapDiv.current);
        }
        const rectFeature = drawRectangle(mapObject, center, getAdriaSize(), getAdriaSize(), "transparent")
        const rectExtent = rectFeature.getGeometry()?.getExtent();
        const coordConverter = getCoordConverter(rectExtent || [0, 0, 0, 0])

        const markerLocation = coordConverter(location.x, location.y);
        mapObject.getView().setCenter(markerLocation);
        const marker = drawMarker(mapObject, markerLocation);

        getImage();

        return () => {
            mapObject.setTarget();
            mapObject.removeLayer(marker);
        }
    }, [location]);

    return <div className={"info"}>
        <div className={"map"}>
            <div ref={mapDiv} className={"ol-map"}/>
        </div>
        <div className={"bottom-container"}>
            {renderEvent(event)}
            <div className={"image-container"}>
                <img src={imgSrc} alt={"Image for: " + event.category.name}/>
            </div>
        </div>
    </div>;
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