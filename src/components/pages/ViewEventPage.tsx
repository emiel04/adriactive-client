import {useParams} from "react-router";
import {useEffect, useState} from "react";
import evApi from "../../services/api-events.ts";
import axios, {CancelTokenSource} from "axios";
import {TEvent} from "../common/events.tsx";
import EventBlock from "../EventBlock.tsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
function ViewEventPage() {

    const [event, setEvent] = useState<TEvent | null>(null);
    {/* const [joined, setJoined] = useState(false); */}
    const { eventId} = useParams();

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        if (eventId != null) {
            evApi.getEventFromId(parseInt(eventId), evReq.token).then(data => {
                setEvent(data);
            }).catch(() => {
            })
        }

        return () => {
            evReq.cancel();
        }
    }, [])

    return <>
        <ArrowBackIosIcon></ArrowBackIosIcon>
        {/* joined : <p>Leave event</p> ? <p>Join event</p> */}

        {event && <EventBlock event={event} key={eventId} onClick={() => null}></EventBlock>}
    </>


}

export default ViewEventPage;