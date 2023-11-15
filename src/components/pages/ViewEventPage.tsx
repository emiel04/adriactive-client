import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import evApi from "../../services/api-events.ts";
import axios, {CancelTokenSource} from "axios";
import {TEvent} from "../common/events.tsx";
import EventBlock from "../EventBlock.tsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from '@mui/joy/Button';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function ViewEventPage() {

    const [event, setEvent] = useState<TEvent | null>(null);
    const { eventId} = useParams();
    const navigate = useNavigate();

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
        <ArrowBackIosIcon onClick={() => navigate(-1)}></ArrowBackIosIcon>
        <h1>{isJoined ? 'Leave event' : 'Join event'}</h1>
        <AccountCircleIcon></AccountCircleIcon>
        <p>Event Details</p>
        {event && <EventBlock event={event} key={eventId} onClick={() => null}></EventBlock>}

        <Button type="submit" onClick={() => navigate('/app/home')}>{isJoined !== undefined || isJoined !== null ? (isJoined ? 'Leave' : 'Join') : 'Return to Homepage'}</Button>
    </>

}

export default ViewEventPage;