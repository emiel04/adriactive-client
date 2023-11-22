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
        <div className={"loading"}>
            {isLoading ? (
                    <p>Loading...</p>
                ) : <>
        <div id={"my-events"}>
            <article id={"joined-events"}>
                <div className={'event-type-header'}>
                    <h1>Ongoing Events</h1>
                </div>
                <div id={"ongoing-events"} className={"side-scroll"}>
                    <div className={"horizontal"}>
                        {renderMyEvents(events)}
                    </div>

                </div>
                <div className={'event-type-header'}>
                    <h1>Upcoming Events</h1>
                </div>
                <div id={"upcoming-events"} className={"side-scroll"}>
                    <div className={"horizontal"}>
                        {renderMyEvents(events)}
                    </div>
                </div>
            </article>
            <div id={"created-events"}>
                <h1>Created Events</h1>
                {renderMyEvents(events)}
            </div>
        </div>
            </>}
        </div>
    </>

}

function renderMyEvents(events : TEvent[]){
    return <>
        {
            events ? (events.map(event => (
                <EventBlock event={event} key={event.id}/>
            ))) : <p>no events found</p>
        }
    </>
}


export default MyEventsPage;

