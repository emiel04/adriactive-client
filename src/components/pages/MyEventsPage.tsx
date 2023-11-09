import {TEvent} from "../common/events.tsx";
import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import evApi from "../../services/api-events.ts";
import EventBlock from "../EventBlock.tsx";
function MyEventsPage(){
    const [events, setEvents] = useState<TEvent[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApi.getEvents(evReq.token).then(data => {
            setEvents(data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        })

        return () => {
            evReq.cancel();
        }
    }, [])


    return <>
        <div id={"myEvents"}>
            <article id={"joinedEvents"}>
                <div id={"ongoingEvents"} className={"sideScroll"}>
                    <h1>Ongoing Events</h1>
                    <div className={"horizontal"}>
                        {renderEvents(events)}
                    </div>

                </div>
                <div id={"upcomingEvents"} className={"sideScroll"}>
                    <h1>Upcoming Events</h1>
                    <div className={"horizontal"}>
                        {renderEvents(events)}
                    </div>
                </div>
            </article>
            <div id={"createdEvents"}>
                <h1>Created Events</h1>
                {renderEvents(events)}
            </div>
        </div>
    </>

}

function renderEvents(events : TEvent[]){
    return <>
        {
            events ? (events.map(event => (
                <EventBlock event={event} key={event.id}/>
            ))) : <p>no events found</p>
        }
    </>
}

export default MyEventsPage;

