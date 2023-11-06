import {TEvents} from "./common/events";
import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import evApi from "../services/api-events";



export default function EventBlock() {

    const [events, setEvents] = useState<TEvents[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApi.getEvents(evReq.token).then(data => {
            setEvents(data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });

        return () => {
            evReq.cancel();
        }
    }, [])

    return <div className={"loading"}>
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            renderEventBlock(events)
        )}
    </div>
}

function renderEventBlock(events: TEvents[]) {
    return events && events.length > 0 ? (
        <ul>
            {events.map((e) => (
                <li key={e.name}>
                    <div className={"event"}>
                        <p>{e.name}</p>
                    </div>
                </li>
            ))}
        </ul>
    ) : (
        <p>No events found!</p>
    )
}