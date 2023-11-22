import CategoryBar from "../CategoryBar";
import EventBlock from "../EventBlock.tsx";
import {useEffect, useState} from "react";
import {TEvent} from "../common/events.tsx";
import axios, {CancelTokenSource} from "axios";
import evApi from "../../services/api-events.ts";

export default function HomePage() {

    const [events, setEvents] = useState<TEvent[]>([]);
    const [filters, setFilters] = useState<Set<number>>(new Set<number>());
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

    return <div className={"homepage"}>
        <CategoryBar filters={filters} setFilters={setFilters}></CategoryBar>
        <div className={"loading"}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                renderEvents(events, filters)
            )}
        </div>
    </div>
}

function renderEvents(events: TEvent[], filters: Set<number>) {
    if (events && filters.size > 0) {
        events = events.filter(e => {
            console.log(e.category);
            return filters.has(e.category.categoryId)
        });
    }

    return events && events.length > 0 ? (
        events.map((e) => (
            <EventBlock key={e.id} event={e} onClick={() => null}></EventBlock>
        ))
    ) : (
        <div>
            <p className={"error"}>No events found!</p>
        </div>
    )

}
