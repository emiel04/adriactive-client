import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import evApi from "../../services/api-events";
import EventBlock from "../EventBlock";
import {TEvent} from "../common/events";
export default function Events() {

    const [events, setEvents] = useState<TEvent[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApi.getEvents(evReq.token).then(data => {
            setEvents(data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });

        return () => {
            evReq.cancel();
        }
    }, [])

    return <div className={"loading"}>
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            renderEvents(events)
        )}
    </div>
}

function renderEvents(events: TEvent[]) {
    return events && events.length > 0 ? (
            events.map((e) => (
                <EventBlock key={e.id} event={e}></EventBlock>
            ))
    ) : (
        <div>
            <p className={"error"}>No events found!</p>
        </div>
    )
}