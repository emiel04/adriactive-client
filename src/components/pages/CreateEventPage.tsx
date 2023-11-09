import Autocomplete from '@mui/joy/Autocomplete';
import Slider from '@mui/joy/Slider';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import evApi from "../../services/api-interests.ts";
import React, {useEffect, useState} from "react";
import {TInterest} from "../common/interest.tsx";
import axios, {CancelTokenSource} from "axios";


export default function HomePage() {
    const [interests, setInterests] = useState<TInterest[]>([]);
    const [value, setValue] = React.useState<number[]>([12, 24]);

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


    function handleSubmit(e) {
        e.preventDefault();
        //handle the submit when sector is set
    }

    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <ArrowBackIosIcon></ArrowBackIosIcon>
            <h1>Create Event</h1>
            <label>Event Name</label>
            <Input placeholder="Type in here…" />

            <label>Description</label>
            <Textarea placeholder="Type anything…" />

            <div className="dropdowns">
                <label>Category</label>
                <Autocomplete
                    options={interests}
                />

                <label>Sector</label>
                <Autocomplete
                    options={}
                />
            </div>
            <label>Number of People</label>
            <Slider
                getAriaLabel={() => 'people range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
            <button type="submit">Create</button>
        </form>
    );
}

