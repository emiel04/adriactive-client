//import React, {useEffect, useRef, useState} from "react";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import evApi from "../../services/api-events.ts";
import catApi from "../../services/api-catergory.ts";
//import secApi from "../../services/api-world.ts";
import axios, {CancelTokenSource} from "axios";
import EventBlock from "../EventBlock.tsx";
import {TEvent} from "../common/events.tsx";
import "../../assets/css/search.scss";
import Input from '@mui/joy/Input';
import {styled} from '@mui/joy/styles';
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {TCategory} from "../common/category.tsx";

const CustomInput = styled(Input)({
    marginTop: '0.5rem',
    width: "15rem",
});

const CustomSelect = styled(Select)({
    marginTop: '0.5rem',
    width: "15rem",
});

function SearchPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<TCategory[]>([]);
    /*const [sectors, setSectors] = useState<TCategory[]>([]);*/
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [events, setEvents] = useState<TEvent[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    /*const [selectedSector, setSelectedSector] = useState<string>('all');
    const [selectedPrice, setSelectedPrice] = useState<string>('all');
    const [selectedAmountOfPeople, setSelectedAmountOfPeople] = useState<string>('all');
*/
    const navigate = useNavigate();

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApi.getEvents(evReq.token)
            .then((data) => {
                setEvents(data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });

        const catReq: CancelTokenSource = axios.CancelToken.source();
        catApi.getCategories(catReq.token)
            .then(data => {
                console.log(data)
                setCategories(data);
                setIsLoading(false);
            }).catch(() => {
            setIsLoading(false);
        });

        /*const secReq: CancelTokenSource = axios.CancelToken.source();
        secApi.getSectors(secReq.token)
            .then(data => {
                setSectors(data);
                setIsLoading(false);
            }).catch(() => {
            setIsLoading(false);
        });*/

        return () => {
            evReq.cancel();
            //catReq.cancel();
            //secReq.cancel();
        };
    }, []);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTerm(event.target.value);
    };

    const renderOptionsCategories = () => {
        const options = categories.map((category) => (
            <Option key={category.name} value={category.name}>
                {category.name}
            </Option>
        ));

        options.unshift(<Option key="all" value={""}>All</Option>);
        return options;
    };

    const filterCategories = (event: React.ChangeEvent<{ value: string }>) => {
        console.log("Event:", event);
        const selected = event.target.value;
        // Ignore "all" value
        if (selectedCategory === "all") {
            return;
        }

        setSelectedCategory(selected);
        console.log(selectedCategory);
    };


    /*const renderOptionsSector = () => {
        console.log(sectors);
        if (!sectors) {
            return <Option key={"error"} value={"error"}>
                No sectors found!
            </Option>
        }

        const options = sectors.map((sector) => (
            <Option key={sector.name} value={sector.name}>
                {sector.name}
            </Option>
        ));

        options.unshift(<Option key="all" value={""}>All</Option>);
        return options;
    };*/

    return (
        <>
            <div id={"filterBar"}>
                <CustomInput
                    placeholder="Search for an event..."
                    id="searchBar"
                    onChange={handleInputChange}
                    value={searchTerm}
                >
                </CustomInput>
                <CustomSelect
                    placeholder="Category"
                    className={"selectBox"}
                    variant="outlined"
                    value={selectedCategory}
                    onChange={(filterCategories as any)}
                >
                    {renderOptionsCategories()}
                </CustomSelect>
            </div>
            <div className={"homepage"}>
                <div className={"events"}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        //renderEvents(events, searchTerm, selectedCategory)
                        renderEvents(events, searchTerm)
                    )}
                </div>
            </div>
        </>
    );

    /*function renderEvents(events: TEvent[], searchTerm: string) {
    function renderEvents(events: TEvent[], searchTerm: string, selectedCategory: string | null) {
        let filteredEvents = [...events]; // Create a copy of the original array

        if (searchTerm) {
            filteredEvents = filteredEvents.filter((e) =>
                e.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== null && selectedCategory !== "all") {
            filteredEvents = filteredEvents.filter(
                (e) => e.category.name === selectedCategory
            );
        }

        // Check if filteredEvents is empty
        if (filteredEvents.length === 0) {
            return (
                <div>
                    <p className={"error"}>No events found!</p>
                </div>
            );
        }
        console.log(events);
        return filteredEvents.map((e) => (
            <EventBlock
                key={e.id}
                event={e}
                onClick={() => navigate(`/event/view/${e.id}`)}
            ></EventBlock>
        ));
    }
}*/

    function renderEvents(events: TEvent[], searchTerm: string) {
        let filteredEvents = events;

        if (searchTerm) {
            filteredEvents = events.filter((e) =>
                e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.organiser.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.organiser.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            ;
        }

        /*if (selectedCategory !== null && selectedCategory !== "all") {
            filteredEvents = filteredEvents.filter(
                (e) => e.category.name === selectedCategory
            );
        }*/

        // Check if filteredEvents is null or undefined
        if (!filteredEvents || filteredEvents.length === 0) {
            return (
                <div>
                    <p className={"error"}>No events found!</p>
                </div>
            );
        }

        return filteredEvents.map((e) => (
            <EventBlock
                key={e.id}
                event={e}
                onClick={() => navigate(`/event/view/${e.id}`)}
            ></EventBlock>
        ));
    }
}

//function renderEvents(events: TEvent[], searchTerm: string, selectedCategory: string | null)

export default SearchPage;
