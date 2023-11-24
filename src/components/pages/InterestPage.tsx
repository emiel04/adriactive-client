import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import api from "../../services/api-interests.ts";
import {TInterest} from "../common/interest.tsx";
import InterestBlock from "../InterestBlock.tsx";
import Button from '@mui/joy/Button';
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";

export default function InterestPage() {
    const [interests, setInterests] = useState<TInterest[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
    const navigate = useNavigate();
    const evReq: CancelTokenSource = axios.CancelToken.source();
    const [searchParams] = useSearchParams();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {

        api.getInterests(evReq.token).then(data => {
            setInterests(data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });

        return () => {
            evReq.cancel();
        }
    }, [])

    useEffect(() => {
        const editing = searchParams.get('editing');
        setIsEditing(editing === "true")
    }, [searchParams]);

    return <>
        <div className={"loading"}>
            {isLoading ? (
                <p>Loading...</p>
            ) : <>
                <form className="form-group" onSubmit={handleSubmit}>
                    <div className="interests-page">
                        <h2>{isEditing ? 'Change Interests' : 'Select Interests'}</h2>
                        <h3>{isEditing ? '' : 'Select at least 3 categories or skip and finish later'}</h3>
                        <div className="interests-grid">
                            {renderInterests(interests)}
                        </div>
                        <Button type="submit" className="skip-button"
                                onClick={() => navigate('/app/home')}>{isEditing ? 'Save' : 'Skip'}</Button>
                    </div>
                </form>
            </>}
        </div>
    </>

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log(selectedInterests);
        api.addInterests(selectedInterests, evReq.token).then(r => console.log(r));

        navigate('/app/home');
    }

    function handleInterestClick(interestId: number) {
        setSelectedInterests(prevSelected => {
            if (prevSelected.includes(interestId)) {
                return prevSelected.filter(id => id !== interestId);
            } else {
                return [...prevSelected, interestId];
            }
        });
    }

    function renderInterests(interests: TInterest[]) {
        return interests && interests.length > 0 ? (
            interests.map((e) => (
                <InterestBlock
                    key={e.id} interest={e}
                    onClick={() => handleInterestClick(e.id)}
                    isSelected={selectedInterests.includes(e.id)}
                ></InterestBlock> //key to order the Block by their id
            ))
        ) : (
            <div>
                <p className={"error"}>No interests found!</p>
            </div>
        )

    }
}

