import {TEvent} from "./common/events";
import Kaas from "../assets/img/kaas.jpg"

type TEventBlockProps = {
    event: TEvent;
}

export default function EventBlock(prop: TEventBlockProps) {
    console.log(prop.event)
    return <div className="event" id={prop.event.id.toString()}>
                <h2>{prop.event.name}</h2>
                <ul>
                    <li>Organised by: {prop.event.organiser.firstName} {prop.event.organiser.lastName}</li>
                    <li>Located in sector: {prop.event.sector}</li>
                    <li>Spots left: {prop.event.amountOfPeople}</li>
                    <li>{prop.event.description}</li>
                    <li><img src={Kaas} alt={"kaas"}/></li>
                </ul>
            </div>;
}