import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import evApi from "../../services/api-events.ts";
import axios, {CancelTokenSource} from "axios";
import EventBlock from "../EventBlock.tsx";
import {TEvent} from "../common/events.tsx";
import "../../assets/css/search.scss"
import Input from '@mui/joy/Input';
import {styled} from '@mui/joy/styles';
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

const CustomInput = styled(Input)({
    marginTop: '0.5rem',
    width: "15rem",
    backgroundColor: "#f0f0f0"
});

const CustomSelect = styled(Select)({
    marginTop: '0.5rem',
    width: "15rem",
    backgroundColor: "#f0f0f0"
});

function SearchPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [events, setEvents] = useState<TEvent[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApi
            .getEvents(evReq.token)
            .then((data) => {
                setEvents(data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });

        return () => {
            evReq.cancel();
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div>
                <CustomInput
                    placeholder="Search for an event..."
                    id="searchBar"
                    onChange={handleInputChange}
                    value={searchTerm}/>
                <CustomSelect
                    placeholder="Category"
                    variant="outlined"
                >
                    <Option value={"Sport"}></Option>
                </CustomSelect>
            </div>
            <div className={"homepage"}>
                <div className={"events"}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        renderEvents(events)
                    )}
                </div>
            </div>
        </>
    );

    function renderEvents(events: TEvent[]) {
        let filteredEvents = events;

        if (searchTerm) {
            filteredEvents = events.filter((e) =>
                e.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filteredEvents && filteredEvents.length > 0 ? (
            filteredEvents.map((e) => (
                <EventBlock
                    key={e.id}
                    event={e}
                    onClick={() => navigate(`/event/view/${e.id}`)}
                ></EventBlock>
            ))
        ) : (
            <div>
                <p className={"error"}>No events found!</p>
            </div>
        );
    }
}

export default SearchPage;
