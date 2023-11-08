import {TEvent} from "./common/events";
import Kaas from "../assets/img/kaas.jpg"

type TEventBlockProps = {
    event: TEvent;
}

export default function EventBlock(prop: TEventBlockProps) {
    console.log(prop.event)
    return <div className="event" id={prop.event.id.toString()}>
                <h2>{prop.event.title}</h2>
                <ul>
                    <li>{prop.event.category.name}</li>
                    <li>{prop.event.organiser.firstName}</li>
                    <li>{prop.event.organiser.lastName}</li>
                    <li>{prop.event.sector}</li>
                    <li>{prop.event.eventType}</li>
                    <li><img src={Kaas} alt={"kaas"}/></li>
                    </ul>
            </div>;
}