import CategoryBar from "../CategoryBar";
import EventBlock from "../EventBlock.tsx";
import {useEffect, useState} from "react";
import {TEvent} from "../common/events.tsx";
import axios, {CancelTokenSource} from "axios";
import evApi from "../../services/api-events.ts";

type TEventBlockProps = {
    event: TEvent;
}

export default function HomePage() {

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

    return <>
        <CategoryBar></CategoryBar>
        <div className={"loading"}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                renderEvents(events)
            )}
        </div>
    </>
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

export function filterEvents(categoryName: string, events: TEventBlockProps[]) {
    const newEvents = events.filter((prop) => prop.event.category.name === categoryName);
    console.log(newEvents);
    setFilteredEvents(newEvents);
    return filteredEvents;
}
