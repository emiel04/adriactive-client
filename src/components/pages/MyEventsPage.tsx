import {TEvent} from "../common/events.tsx";
import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import evApi from "../../services/api-events.ts";
import EventBlock from "../EventBlock.tsx";
import {useNavigate} from "react-router";
import "../../assets/css/my-events-page.css"
import "../../assets/css/events.css"

function MyEventsPage() {
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
                <div id={"my-events"}>
                    <article id={"joined-events"}>
                        <div id={"ongoing-events"} className={"sideScroll"}>
                            <div className={'event-type-header'}>
                                <h2>Ongoing Events</h2>
                            </div>
                            <div className={"horizontal"}>
                                {renderEvents(events)}
                            </div>

                        </div>
                        <div id={"upcoming-events"} className={"sideScroll"}>
                            <div className={'event-type-header'}>
                                <h2>Upcoming Events</h2>
                            </div>
                            <div className={"horizontal"}>
                                {renderEvents(events)}
                            </div>
                        </div>
                    </article>
                    <div id={"created-events"}>
                        <h2>Created Events</h2>
                        <div className={"event-container"}>
                            {renderEvents(events)}
                        </div>
                    </div>
                </div>
            </>}
        </div>
    </>

    function renderEvents(events: TEvent[]) {
        return <>
            {
                events ? (events.map(event => (
                    <EventBlock event={event} key={event.id} simple={true}
                                onClick={() => navigate(`app/event/view/${event.id}`)}/>
                ))) : <p>no events found</p>
            }
        </>
    }

}


export default MyEventsPage;

