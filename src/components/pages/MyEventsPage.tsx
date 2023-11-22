import {TEvent} from "../common/events.tsx";
import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import evApi from "../../services/api-events.ts";
import EventBlock from "../EventBlock.tsx";
import {useNavigate} from "react-router";

function MyEventsPage(){
    const [events, setEvents] = useState<TEvent[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

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
        <div id={"myEvents"}>
            <article id={"joinedEvents"}>
                <div id={"ongoingEvents"} className={"sideScroll"}>
                    <div className={'eventTypeHeader'}>
                        <h1>Ongoing Events</h1>
                    </div>
                    <div className={"horizontal"}>
                        {renderEvents(events)}
                    </div>

                </div>
                <div id={"upcomingEvents"} className={"sideScroll"}>
                    <div className={'eventTypeHeader'}>
                        <h1>Upcoming Events</h1>
                    </div>
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
            </>}
        </div>
    </>

    function renderEvents(events : TEvent[]){
        return <>
            {
                events ? (events.map(event => (
                    <EventBlock event={event} key={event.id} onClick={()=> navigate(`app/event/view/${event.id}`)}/>
                ))) : <p>no events found</p>
            }
        </>
    }

}



export default MyEventsPage;

