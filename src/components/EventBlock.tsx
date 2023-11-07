import {TEvent} from "./common/events";

type TEventBlockProps = {
    event: TEvent;
}

export default function EventBlock({event}: TEventBlockProps) {
    return event.name;
}