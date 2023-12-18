import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import evApi from "../../services/api-events.ts";
import catApi from "../../services/api-catergory.ts";
import axios, {CancelTokenSource} from "axios";
import EventBlock from "../EventBlock.tsx";
import {TEvent} from "../common/events.tsx";
import "../../assets/css/search.scss"
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
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [events, setEvents] = useState<TEvent[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
        catApi.getCategories(catReq.token).then(data => {
            setCategories(data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });

        return () => {
            evReq.cancel();
        };
    }, []);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTerm(event.target.value);
    };

    /*const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedCategory(event.target.value as string | null);
    };*/

    const renderOptions = () => {
        // Include an "All" option to deselect the category
        const options = categories.map((category) => (
            <Option key={category.categoryId} value={category.name}>
                {category.name}
            </Option>
        ));

        options.unshift(<Option key="all" value={null}>All</Option>);
        return options;
    };

    return (
        <>
            <div id={"filterBar"}>
                <CustomInput
                    placeholder="Search for an event..."
                    id="searchBar"
                    onChange={handleInputChange}
                    value={searchTerm}
                />
                <CustomSelect
                    placeholder="Category"
                    variant="outlined"
                    value={selectedCategory}
                    onChange={(event) => {
                        if (event && event.target instanceof HTMLSelectElement) {
                            setSelectedCategory(event.target.value || null);
                        }
                    }}                >
                    {renderOptions()}
                </CustomSelect>
            </div>
            <div className={"homepage"}>
                <div className={"events"}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        renderEvents(events, searchTerm, selectedCategory)
                    )}
                </div>
            </div>
        </>
    );

    function renderEvents(events: TEvent[], searchTerm: string, selectedCategory: string | null) {
        let filteredEvents = events;

        if (searchTerm) {
            filteredEvents = events.filter((e) =>
                e.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== null && selectedCategory !== "all") {
            filteredEvents = filteredEvents.filter(
                (e) => e.category.name === selectedCategory
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
