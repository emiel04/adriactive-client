import {useEffect, useRef, useState} from "react";
import {TEvent} from "./common/events";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import getSectorName from "../helpers/sectorhelper.ts";
import {AccessTimeFilled} from "@mui/icons-material";
import {DATE_OPTIONS, TIME_OPTIONS} from "../helpers/datehelper.ts";
import {Coordinate} from "ol/coordinate";
import {createMapObject, getAdriaMiddle, getCoordConverter} from "../helpers/maphelpers/server-location-helper.ts";
import {drawMarker, drawRectangle, getAdriaSize} from "../helpers/maphelpers/shape-drawer.ts";
import {TCoordinate} from "./common/TWorldSector.tsx";

type TViewEventBlockProps = {
    event: TEvent;
};

export default function EventBlock(prop: TViewEventBlockProps) {
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        import(`../assets/img/${prop.event.category.categoryId}.png`)
            .then((module) => {
                setImgSrc(module.default);
            })
            .catch((error) => {
                console.error('Error loading image:', error);
            });
    }, [prop.event.category.categoryId]);

    return (<>

            <div className={"event-details-container"}>
                <div>
                    <div className="imageContainer">
                        <img src={imgSrc} alt={`Category: ${prop.event.name}`} className="imgViewEvent"/>
                    </div>
                    <div className="event-details" id={prop.event.id.toString()}>
                        <h2>{prop.event.name}</h2>
                        <ul>
                            <li><PersonIcon/>{prop.event.organiser.firstName} {prop.event.organiser.lastName}</li>
                            <li><LocationOnIcon/>{getSectorName(prop.event.sector.id)}</li>
                            <li>
                                <AccessTimeFilled/>{new Date(prop.event.startDateTime * 1000).toLocaleDateString(undefined, DATE_OPTIONS)}{' | '}
                                {new Date(prop.event.startDateTime * 1000).toLocaleTimeString(undefined, TIME_OPTIONS)}
                            </li>
                            <li><CheckCircleIcon/>{prop.event.amountOfPeople}</li>
                            <li>{prop.event.description}</li>
                        </ul>
                    </div>
                </div>

                {/*<MarkerMap markerPoint={prop.event.location}></MarkerMap>*/}
                <div className={"event-details-map"}>

                </div>
            </div>

        </>
    );
}

type MarkerMapProps = {
    markerPoint: TCoordinate
}

function MarkerMap({markerPoint}: MarkerMapProps) {
    if (markerPoint === null) return <></>;
    const mapDiv = useRef(null);

    useEffect(() => {
        const center: Coordinate = getAdriaMiddle();
        const mapObject = createMapObject(center, 16);
        if (mapDiv.current) {
            mapObject.setTarget(mapDiv.current);
        }
        const rectFeature = drawRectangle(mapObject, center, getAdriaSize(), getAdriaSize(), "transparent")
        const rectExtent = rectFeature.getGeometry()?.getExtent();
        const coordConverter = getCoordConverter(rectExtent || [0, 0, 0, 0])

        const markerLocation = coordConverter(markerPoint.x, markerPoint.y);
        mapObject.getView().setCenter(markerLocation);
        const marker = drawMarker(mapObject, markerLocation);

        return () => {
            mapObject.setTarget();
            mapObject.removeLayer(marker);
        }
    }, [markerPoint]);
    return <div ref={mapDiv} className={"ol-map"}/>
}