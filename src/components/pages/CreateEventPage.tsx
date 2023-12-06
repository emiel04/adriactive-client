import Autocomplete from '@mui/joy/Autocomplete';
import Slider from '@mui/joy/Slider';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import evApiInterests from "../../services/api-interests.ts";
import evApiSectors from "../../services/api-world.ts";
import evApiEvents from "../../services/api-events.ts";
import {useEffect, useState} from "react";
import {TInterest} from "../common/interest.tsx";
import axios, {CancelTokenSource} from "axios";
import {useNavigate} from "react-router";
import {TSector} from "../common/TSector.tsx";
import {useSearchParams} from "react-router-dom";
import {TAmountOfPeople} from "../common/events.tsx";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';


export default function CreateEventPage() {
    const [interests, setInterests] = useState<TInterest[]>([]);
    const [sectors, setSectors] = useState<TSector[]>([]);
    const navigate = useNavigate();
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<TInterest | null>(null);
    const [loadSectors, setLoadSectors] = useState<TSector | null>(null);
    const [value, setValue] = useState<TAmountOfPeople>([12, 24]);
    const [searchParams] = useSearchParams();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [hours, setHours] = useState(0);
    const evReq: CancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
        evApiInterests.getInterests(evReq.token).then(data => {
            setInterests(data);
        }).catch(() => {
        });

        evApiSectors.getSectors(evReq.token).then(data => {
            setSectors(data);
        }).catch(() => {
        });

        return () => {
            evReq.cancel();
        }
    }, [])

    useEffect(() => {
        const editing = searchParams.get('editing');
        setIsEditing(editing === "true")
    }, [searchParams]);


    const handleChange = (_event: Event, newValue: number | number[], _: number) => {
        setValue(newValue as TAmountOfPeople);
    };

    const handleSliderChange = (event, newValue) => {
        setHours(newValue);
    };

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        const startDateTime = date ? date.valueOf() : null;

        const eventData = {
            "name": eventName,
            "description": description,
            "amountOfPeople": value,
            "categoryId": category,
            "sectorId": loadSectors,
            "startDateTime": startDateTime,
            "hours": hours,
        };
        if (isEditing) { //TODO: fix the parameter passing
            evApiEvents.editEvent(/* eventid */,eventData, evReq.token).then(r => console.log(r));
        } else {
            evApiEvents.createEvent(/* eventid */,eventData, evReq.token).then(r => console.log(r));
        }
        navigate('/app/home');
    }


    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <ArrowBackIosIcon onClick={() => navigate(-1)}></ArrowBackIosIcon>
            <h1>{isEditing ? 'Edit Event' : 'Create Event'}</h1>
            <label>Event Name</label>
            <Input placeholder="Type in here…" onChange={e => setEventName(e.target.value)}
                   required
            />

            <label>Description</label>
            <Textarea placeholder="Type anything…" onChange={e => setDescription(e.target.value)}
                      required
            />

            <div className="dropdowns">
                <label>Category</label>
                <Autocomplete
                    options={interests}
                    onChange={(_event, newValue) => setCategory(newValue)}
                    getOptionLabel={(option) => option.name ?? option}
                    required
                />

                <label>Sectors</label>
                <Autocomplete
                    options={sectors}
                    onChange={(_event, newValue) => setLoadSectors(newValue)}
                    getOptionLabel={(option) => option.name ?? option}
                    required
                />

            </div>
            <label>Number of People</label>
            <Slider
                getAriaLabel={() => 'people range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />

            <label>Duration</label>
            <DatePicker label="Start date"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
            />
                <Slider
                    aria-label="Hours"
                    defaultValue={0}
                    step={1}
                    value={hours}
                    onChange={handleSliderChange}
                    min={0}
                    max={48}
                    valueLabelDisplay="auto"
                />
            <Button type="submit">{isEditing ? 'Save' : 'Create'}</Button>
        </form>
    );
}

