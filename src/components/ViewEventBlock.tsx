import {useEffect, useState} from "react";
import {TEvent} from "./common/events";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
            <div className="imageContainer">
                <img src={imgSrc} alt={`Category: ${prop.event.name}`} className="imgViewEvent" />
                <AccountCircleIcon id="profilePic"/>
            </div>
            <h1 id="eventDetails">Event Details:</h1>
            <div className="viewEvent" id={prop.event.id.toString()}>
                <h2>{prop.event.name}</h2>
                <ul>
                    <li>Organised by: {prop.event.organiser.firstName} {prop.event.organiser.lastName}</li>
                    <li>Located in sector: {prop.event.sector}</li>
                    <li>Spots left: {prop.event.amountOfPeople}</li>
                    <li>{prop.event.description}</li>
                </ul>
            </div>
        </>
    );
}