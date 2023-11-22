import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import evApi from "../../services/api-events";
import ViewEventBlock from "../ViewEventBlock";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from '@mui/joy/Button';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ViewEventPage() {
    const [event, setEvent] = useState(null);
    const { id: eventId } = useParams(); // Ensure that the parameter name matches your route
    const navigate = useNavigate();
    const [isJoined, setIsJoined] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const evReq = axios.CancelToken.source();
        console.log('eventId:', eventId);

        if (eventId != null) {
            evApi.getEventFromId(parseInt(eventId), evReq.token)
                .then(data => {
                    console.log('Fetched event data:', data);
                    setEvent(data);
                })
                .catch(error => {
                    console.error('Error fetching event data:', error);
                });
        }

        return () => {
            evReq.cancel();
        };
    }, [eventId]);

    useEffect(() => {
        const isJoined = searchParams.get('joined');
        setIsJoined(isJoined === "true");
    }, [searchParams]);

    return (
        <>
            <ArrowBackIosIcon onClick={() => navigate(-1)} />
            <h1>{isJoined ? 'Leave event' : 'Join event'}</h1>
            <AccountCircleIcon />
            <p>Event Details</p>
            {event && <ViewEventBlock event={event} />}
            <Button type="submit" onClick={() => navigate('/app/home')}>
                {isJoined ? 'Leave' : 'Join'}
            </Button>
        </>
    );
}

export default ViewEventPage;