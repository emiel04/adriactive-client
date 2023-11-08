import {TEvent} from "./common/events";
import Image from "../assets/img/kaas.jpg";

type TEventBlockProps = {
    event: TEvent;
}

export default function EventBlock(prop: TEventBlockProps) {

    return <div className="event" id={prop.event.id.toString()}>
                <h2>{prop.event.title}</h2>
                <ul>
                    <li>{prop.event.category}</li>
                    <li>{prop.event.organiser}</li>
                    <li>{prop.event.sector}</li>
                    <li><img src={Image} alt={"kaas"}/></li>
                    </ul>
            </div>;
}