import {TEvent} from "../common/events.tsx";
import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import evApi from "../../services/api-myEvents.ts";
import EventBlock from "../EventBlock.tsx";
import {useNavigate} from "react-router";
import "../../assets/css/my-events-page.css"
import "../../assets/css/events.css"
import Button from "@mui/joy/Button";

function MyEventsPage() {
    const [ongoingEvents, setOngoingEvents] = useState<TEvent[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<TEvent[]>([]);
    const [createdEvents, setCreatedEvents] = useState<TEvent[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isNoOngoing, setIsNoOngoing] = useState<boolean>(true);
    const [isNoUpcoming, setIsNoUpcoming] = useState<boolean>(true);
    const [isNoCreated, setIsNoCreated] = useState<boolean>(true);
    const navigate = useNavigate();


    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApi.getOngoingEvents(evReq.token).then(dataOngoing => {
            setOngoingEvents(dataOngoing);

            setIsNoOngoing(Object.keys(dataOngoing).length === 0);
            setIsLoading(false);
        }).catch(() => {
            setIsNoOngoing(false);
            setIsLoading(false);
        })

        evApi.getUpcomingEvents(evReq.token).then(dataUpcoming => {
            setUpcomingEvents(dataUpcoming);

            setIsNoUpcoming(Object.keys(dataUpcoming).length === 0);
            setIsLoading(false);
        }).catch(() => {
            setIsNoUpcoming(false);
            setIsLoading(false);
        })

        evApi.getCreatedEvents(evReq.token).then(dataCreated => {
            setCreatedEvents(dataCreated);

            setIsNoCreated(Object.keys(dataCreated).length === 0);
            setIsLoading(false);
        }).catch(() => {
            setIsNoCreated(false);
            setIsLoading(false);
        })
        return () => {
            evReq.cancel();
        }
    }, [])


    return <div className={"loading"}>
        {isLoading ? (
                <p>Loading...</p>
            ) :
            <div id={"my-events"}>
                <div id={"joined-events"}>
                    <div id={"ongoing-events"} className={"sideScroll"}>
                        <div className={'event-type-header'}>
                            <h2>Ongoing Events</h2>
                        </div>
                        <div className={"horizontal"}>
                            <div>
                                {isNoOngoing ? (
                                    <p className={"error"}>There are no ongoing events!</p>
                                ) : null}
                                {renderEvents(ongoingEvents)}
                            </div>
                        </div>

                    </div>
                    <div id={"upcoming-events"} className={"sideScroll"}>
                        <div className={'event-type-header'}>
                            <h2>Upcoming Events</h2>
                        </div>
                        <div className={"horizontal"}>
                            <div>
                                {isNoUpcoming ? (
                                    <p className={"error"}>There are no upcoming events!</p>
                                ) : null}
                            </div>
                            {renderEvents(upcomingEvents)}
                        </div>
                    </div>
                </div>
                <div id={"created-events"}>
                    <h2>Created Events</h2>
                    <div className={"event-container"}>
                        <div>
                            {isNoCreated ? (
                                <p className={"error"}>You have not created an event yet!</p>
                            ) : null}
                        </div>
                        {renderEvents(createdEvents)}
                    </div>
                    <Button onClick={() => navigate('/app/event/create')}>Create Event</Button>
                </div>
            </div>}
    </div>

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

