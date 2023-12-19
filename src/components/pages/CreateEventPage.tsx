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
import dayjs, {Dayjs} from 'dayjs';
import { Calendar } from 'primereact/calendar';
import { PrimeReactProvider } from 'primereact/api';
import toast from "react-hot-toast";
import {log} from "ol/console";


export default function CreateEventPage() {
    const [interests, setInterests] = useState<TInterest[]>([]);
    const [sectors, setSectors] = useState<TSector[]>([]);
    const navigate = useNavigate();
    const [eventName, setEventName] = useState("");
    const [eventId, setEventId] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<TInterest | null>(null);
    const [loadSectors, setLoadSectors] = useState<TSector | null>(null);
    const [value, setValue] = useState<number>(0);
    const [searchParams] = useSearchParams();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [hours, setHours] = useState(0);
    const [eventData, setEventData] = useState({});

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApiInterests.getInterests(evReq.token).then(data => {
            setInterests(data);
            console.log(data);
        }).catch(() => {
        });

        evApiSectors.getSectors(evReq.token).then(data => {
            setSectors(data);
            console.log(data);
        }).catch(() => {
        });

        return () => {
            evReq.cancel();
        }
    }, [])

    useEffect(() => {
        const editing = searchParams.get('editing');
        setIsEditing(!!editing)
        setEventId(editing)
    }, [searchParams]);


    const handleChange = (_event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setHours(newValue as number);
    };

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        const startDateTime = date ? date.valueOf() : null;

        setEventData({
            "name": eventName,
            "description": description,
            "amountOfPeople": value,
            "categoryId": category.categoryId,
            "sectorId": loadSectors,
            "startDateTime": startDateTime,
            "hours": hours,
        });
        if (isEditing) {
            handleEdit();
        } else {
            handleCreate();
        }
        navigate('/app/home');
    }

    function handleEdit() {
        const editReq = toast.promise(editEvent(), {
            loading: "Editing event...",
            success: "Successfully edited event!",
            error: "Error editing event, try again later. If the issue persists contact support."
        }).catch(err => log(err));
        editReq.then((res) => {
            console.log(res);
        });
    }

    function handleCreate() {
        const createReq = toast.promise(createEvent(), {
            loading: "Creating event...",
            success: "Successfully created event!",
            error: "Error creating event, try again later. If the issue persists contact support."
        }).catch(err => log(err));
        createReq.then((res) => {
            console.log(res);
        });
    }
    async function editEvent() {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        if (!eventId) return;
        return await evApiEvents.editEvent(event.id, eventData, evReq.token);
    }

    async function createEvent() {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        if (!eventId) return;
        return await evApiEvents.createEvent(eventData, evReq.token);
    }

    return (
        <PrimeReactProvider>
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
                aria-label="Amount of People"
                defaultValue={10}
                value={value}
                onChange={handleChange}
                step={1}
                valueLabelDisplay="auto"
            />

            <label>StartDate</label>
            <Calendar value={date?.toDate()} onChange={(e) => setDate(dayjs(e.value))} />
            <label>Hours</label>
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
        </PrimeReactProvider>
    );
}

