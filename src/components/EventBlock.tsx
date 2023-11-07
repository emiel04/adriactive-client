import {TEvent} from "./common/events";

type TEventBlockProps = {
    event: TEvent;
}

export default function EventBlock({event}: TEventBlockProps) {
    return <div className={"event"}>
            <h2>{event.title}</h2>
            <ul>
                <li><p>{event.category}</p></li>
                <li><p>{event.organiser}</p></li>
                <li><p>{event.location}</p></li>
            </ul>
        <p>{event.id}</p>
        </div>;
}