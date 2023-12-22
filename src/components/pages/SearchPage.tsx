import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import evApi from "../../services/api-events.ts";
import catApi from "../../services/api-catergory.ts";
import secApi from "../../services/api-world.ts";
import axios, {CancelTokenSource} from "axios";
import EventBlock from "../EventBlock.tsx";
import {TEvent} from "../common/events.tsx";
import "../../assets/css/search.scss";
import Input from '@mui/joy/Input';
import {styled} from '@mui/joy/styles';
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {TCategory} from "../common/category.tsx";
import Button from "@mui/joy/Button";

const CustomInput = styled(Input)({
    marginTop: '0.5rem',
    marginLeft: '2rem',
    marginRight: '3rem',
    width: "35rem",
}) as typeof Button;

const CustomSelect = styled(Select)({
    marginTop: '0.5rem',
    marginRight: '3rem',
    width: "15rem",
}) as typeof Select;

function SearchPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<TCategory[]>([]);
    const [sectors, setSectors] = useState<TCategory[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [events, setEvents] = useState<TEvent[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedSector, setSelectedSector] = useState<string>('');
    const [selectedAmountOfPeople, setSelectedAmountOfPeople] = useState<string>('');

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
                setCategories(data);
                setIsLoading(false);
            }).catch(() => {
            setIsLoading(false);
        });

        const secReq: CancelTokenSource = axios.CancelToken.source();
        secApi.getSectors(secReq.token)
            .then(data => {
                setSectors(data);
                setIsLoading(false);
            }).catch(() => {
            setIsLoading(false);
        });

        return () => {
            evReq.cancel();
        };
    }, []);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLButtonElement>
    ) => {
        setSearchTerm(event.target.value);
        renderEvents(events, searchTerm);
    };


    const renderOptionsCategories = () => {
        const options = categories.map((category) => (
            <Option key={category.name} value={category.name}>
                {category.name}
            </Option>
        ));

        options.unshift(<Option key="all" value={""}>Select a Category</Option>);
        return options;
    };

    const filterCategories = (e: any) => {
        setSelectedCategory(e.target.innerText);

        renderEvents(events, searchTerm);
    }

    const renderOptionsSectors = () => {
        const options = sectors.map((sector) => (
            <Option key={sector.name} value={sector.name}>
                {sector.name}
            </Option>
        ));

        options.unshift(<Option key="all" value={""}>Select a Sector</Option>);
        return options;
    };

    const filterSectors = (e: any) => {
        e.target.selected = e.target.innerText;


        setSelectedSector(e.target.innerText);

        renderEvents(events, searchTerm);
    }

    const renderOptionsAmountOfPeople = () => {
        const peopleAmounts = [5, 10, 15, 20, 30, 40, 50, 100, 150, 200, 250, 300, 350, 400, 500];
        const options = peopleAmounts.map((personAmount) => (
            <Option key={personAmount} value={personAmount}>
                {personAmount}
            </Option>
        ));

        options.unshift(<Option key="all" value={""}>Select the max Amount Of People</Option>);
        return options;
    };

    const filterAmountOfPeople = (e: any) => {
        setSelectedAmountOfPeople(e.target.innerText);

        renderEvents(events, searchTerm);
    }

    return (
        <>
            <div id={"filterBar"}>
                <CustomInput
                    placeholder="Search for an event..."
                    id="searchBar"
                    value={searchTerm}
                    onChange={handleInputChange}
                >
                </CustomInput>
                <CustomSelect
                    placeholder="Category"
                    variant="outlined"
                    value={selectedCategory}
                    onChange={filterCategories}
                >
                    {renderOptionsCategories()}
                </CustomSelect>
                <CustomSelect
                    placeholder="Sector"
                    variant="outlined"
                    value={selectedSector}
                    onChange={filterSectors}
                >
                    {renderOptionsSectors()}
                </CustomSelect>
                <CustomSelect
                    placeholder="Amount of People"
                    variant="outlined"
                    value={selectedAmountOfPeople}
                    onChange={filterAmountOfPeople}
                >
                    {renderOptionsAmountOfPeople()}
                </CustomSelect>
            </div>
            <div className={"homepage"}>
                <div className={"events"}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        renderEvents(events, searchTerm)
                    )}
                </div>
            </div>
        </>
    );

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

        if (selectedCategory && selectedCategory !== "Select a Category") {
            filteredEvents = filteredEvents.filter((event) => {
                return event.category.name === selectedCategory;
            });
        } else if (selectedCategory === "Select a Category") {
            filteredEvents = events;
        }

        if (selectedSector && selectedSector !== "Select a Sector") {
            filteredEvents = filteredEvents.filter((event) => {
                return event.sector.name === selectedSector;
            });
        } else if (selectedSector === "Select a Sector") {
            filteredEvents = events;
        }

        if (selectedAmountOfPeople && selectedAmountOfPeople !== "Select the max Amount Of People") {
            filteredEvents = filteredEvents.filter((event) => {
                return event.amountOfPeople <= parseInt(selectedAmountOfPeople);
            });
        } else if (selectedAmountOfPeople === "Select the max Amount Of People") {
            filteredEvents = events;
        }

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

export default SearchPage;
