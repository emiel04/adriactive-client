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
import axios, {CancelTokenSource} from "axios";
import {useNavigate} from "react-router";
import {TSector} from "../common/TWorldSector.tsx";
import {useSearchParams} from "react-router-dom";
import dayjs, {Dayjs} from 'dayjs';
import {Calendar} from 'primereact/calendar';
import {PrimeReactProvider} from 'primereact/api';
import toast from "react-hot-toast";
import {TCategory} from "../common/category.tsx";
import {EventData} from "../common/events.tsx";


export default function CreateEventPage() {
    const [interests, setInterests] = useState<TCategory[]>([]);
    const [sectors, setSectors] = useState<TSector[]>([]);
    const navigate = useNavigate();
    const [eventName, setEventName] = useState("");
    const [eventId, setEventId] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<TCategory | null>(null);
    const [loadSector, setLoadSector] = useState<TSector | null>(null);
    const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
    const [searchParams] = useSearchParams();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [hours, setHours] = useState<number>(0);

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
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
        const editing = searchParams.get('id');
        const id = parseInt(editing || "") || 0;
        setEventId(id)
        setIsEditing(!!eventId)

        if (isEditing) {
            preLoadFields();
        }
    }, [searchParams, eventId, isEditing]);

    function preLoadFields() {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApiEvents.getEventFromId(eventId, evReq.token)
            .then(event => {
                setEventName(event.name);
                setDescription(event.description);
                setCategory(event.category);
                setLoadSector(event.sector);
                setNumberOfPeople(event.amountOfPeople);
                setDate(dayjs(event.startDateTime));
                setHours(event.hours);
            })
            .catch(() => {
            });
    }


    const handleSliderNumberOfPeople = (_event: Event, newValue: number | number[]) => {
        setNumberOfPeople(newValue as number);
    };

    const handleSliderHours = (_event: Event, newValue: number | number[]) => {
        setHours(newValue as number);
    };

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        const eventData: EventData = {
            "name": eventName,
            "description": description,
            "amountOfPeople": numberOfPeople,
            "categoryId": category?.categoryId || 0,
            "sectorId": loadSector?.id || 0,
            "startDateTime": date?.valueOf() || 0,
            "hours": hours,
        };
        if (isEditing) {
            handleEdit(eventData);
        } else {
            handleCreate(eventData);
        }
        navigate('/app/events');
    }

    function handleEdit(eventData: EventData) {
        const editReq = toast.promise(editEvent(eventData), {
            loading: "Editing event...",
            success: "Successfully edited event!",
            error: "Error editing event, try again later. If the issue persists contact support."
        }).catch(err => console.log(err));
        editReq.then((res) => {
            console.log(res);
        });
    }

    function handleCreate(eventData: EventData) {
        const createReq = toast.promise(createEvent(eventData), {
            loading: "Creating event...",
            success: "Successfully created event!",
            error: "Error creating event, try again later. If the issue persists contact support."
        }).catch(err => console.log(err));
        createReq.then((res) => {
            console.log(res);
        });
    }

    async function editEvent(eventData: EventData) {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        if (!eventId) return;
        return await evApiEvents.editEvent(eventId, eventData, evReq.token);
    }

    async function createEvent(eventData: EventData) {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        return await evApiEvents.createEvent(eventData, evReq.token);
    }

    async function cancelEvent() {
        return await evApiEvents.cancelEvent(eventId);
    }

    return (
        <PrimeReactProvider>
            <form className="form-group" onSubmit={handleSubmit}>
                <ArrowBackIosIcon onClick={() => navigate(-1)}></ArrowBackIosIcon>
                <h1>{isEditing ? 'Edit Event' : 'Create Event'}</h1>
                <label>Event Name</label>
                <Input placeholder="Type in here…" onChange={e => setEventName(e.target.value)}
                       required
                       value={eventName}
                />

                <label>Description</label>
                <Textarea placeholder="Type anything…" onChange={e => setDescription(e.target.value)}
                          required
                          value={description}
                />

                <div className="dropdowns">
                    <label>Category</label>
                    {(category || !isEditing) &&
                      <Autocomplete
                        options={interests}
                        value={category}
                        onChange={(_event, newValue) => setCategory(newValue)}
                        getOptionLabel={(option) => option.name ?? option}
                        isOptionEqualToValue={option => option.name === category?.name}
                        required
                      />
                    }
                    <label>Sector</label>
                    {(loadSector || !isEditing) &&
                      <Autocomplete
                        options={sectors}
                        value={loadSector}
                        onChange={(_event, newValue) => setLoadSector(newValue)}
                        getOptionLabel={(option) => option.name ?? option}
                        isOptionEqualToValue={option => option.name === loadSector?.name}
                        required
                      />
                    }

                </div>
                <label>Number of People</label>
                <Slider
                    aria-label="Amount of People"
                    value={numberOfPeople}
                    onChange={handleSliderNumberOfPeople}
                    step={1}
                    valueLabelDisplay="auto"
                    aria-required={true}
                />

                <label>StartDate</label>
                <Calendar id="calendar-24h"
                          value={date?.toDate()}
                          onChange={(e) => setDate(dayjs(e.value))}
                          showTime hourFormat="24"/>
                <label>Hours</label>
                <Slider
                    aria-label="Hours"
                    step={1}
                    value={hours}
                    onChange={handleSliderHours}
                    min={0}
                    max={48}
                    valueLabelDisplay="auto"
                    aria-required={true}
                />
                <Button type="submit">{isEditing ? 'Save' : 'Create'}</Button>
                {isEditing && <Button type="submit" color={"danger"} onClick={cancelEvent}>Cancel Event</Button>}
            </form>
        </PrimeReactProvider>
    );
}

