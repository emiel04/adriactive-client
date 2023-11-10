import Autocomplete from '@mui/joy/Autocomplete';
import Slider from '@mui/joy/Slider';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import evApi from "../../services/api-interests.ts";
import {useEffect, useState} from "react";
import {TInterest} from "../common/interest.tsx";
import axios, {CancelTokenSource} from "axios";


export default function HomePage() {
    const [interests, setInterests] = useState<TInterest[]>([]);


    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApi.getInterests(evReq.token).then(data => {
            setInterests(data);
        }).catch(() => {
        });

        return () => {
            evReq.cancel();
        }
    }, [])

    const handleChange = (_event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log(eventName, description, category, value);
    }
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<TInterest | null>(null);
    const [value, setValue] = useState<number[]>([12, 24]);

    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <ArrowBackIosIcon></ArrowBackIosIcon>
            <h1>Create Event</h1>
            <label>Event Name</label>
            <Input placeholder="Type in here…" onChange={e   => setEventName(e.target.value)}
                   required/>

            <label>Description</label>
            <Textarea placeholder="Type anything…" onChange={e   => setDescription(e.target.value)}
                      required

            />

            <div className="dropdowns">
                <label>Category</label>
                <Autocomplete
                    options={interests}
                    onChange={(_event, newValue) => setCategory(newValue)}
                    getOptionLabel={(option) => option.name}
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
            <Button type="submit">Create</Button>
        </form>
    );
}

