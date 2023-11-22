import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEvent } from "./common/events";
import Button from '@mui/joy/Button';

type TEventBlockProps = {
    event: TEvent;
    onClick: () => void;
};

export default function EventBlock(prop: TEventBlockProps) {
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        import(`../assets/img/${prop.event.category.categoryId}.png`)
            .then((module) => {
                setImgSrc(module.default);
            })
            .catch((error) => {
                console.error('Error loading image:', error);
            });
    }, [prop.event.category.categoryId]);

    return (
        <div className="event" id={prop.event.id.toString()}>
            <h2>{prop.event.name}</h2>
            <ul>
                <li><img src={imgSrc} alt={`Category: ${prop.event.name}`} /></li>
                <li>Organised by: {prop.event.organiser.firstName} {prop.event.organiser.lastName}</li>
                <li>Located in sector: {prop.event.sector}</li>
                <li>Spots left: {prop.event.amountOfPeople}</li>
                <li>{prop.event.description}</li>
                <Button onClick={()=> navigate(`/app/events/view/${prop.event.id}`)}>View Event</Button>
            </ul>
        </div>
    );
}