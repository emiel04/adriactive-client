import {useEffect, useState} from "react";
import {TEvent} from "./common/events";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import getSectorName from "../helpers/sectorhelper.ts";

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
                            <li><CheckCircleIcon/>{prop.event.amountOfPeople}</li>
                            <li>{prop.event.description}</li>
                        </ul>
                    </div>
                </div>

                <canvas className={"event-details-map"}>

                </canvas>
            </div>

        </>
    );
}