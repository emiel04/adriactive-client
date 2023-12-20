import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import apiInt from "../../services/api-interests.ts";
import {TInterest} from "../common/interest.tsx";
import InterestBlock from "../InterestBlock.tsx";
import Button from '@mui/joy/Button';
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";
import apiUser from "../../services/api-user.ts";

export default function InterestPage() {
    const [interests, setInterests] = useState<TInterest[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedInterests, setSelectedInterests] = useState<TInterest[]>([]);
    const navigate = useNavigate();
    const evReq: CancelTokenSource = axios.CancelToken.source();
    const [searchParams] = useSearchParams();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const minInterestsSelected = 3;

    useEffect(() => {

        apiInt.getInterests(evReq.token).then(data => {
            setInterests(data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });

        return () => {
        }
    }, [])

    useEffect(() => {
        const editing = searchParams.get('editing');
        setIsEditing(editing === "true");

        if (isEditing) {
            preSelectInterests();
        }
    }, [searchParams]);

    function preSelectInterests() {
        apiUser.getUserInterests(evReq.token)
            .then(interests => {
                setSelectedInterests(interests);
            })
            .catch(() => {});
    }

    return <div className={"loading"}>
            {isLoading ? (
                <p>Loading...</p>
            ) : <form className="form-group" onSubmit={handleSubmit}>
                    <div className="interests-page">
                        <h2>{isEditing ? 'Change Interests' : 'Select Interests'}</h2>
                        {isEditing ? (
                                <h3>Select at least 3 categories</h3>
                            ) : <h3>Select at least 3 categories or skip and finish later</h3>}
                        <div className="interests-grid">
                            {renderInterests(interests)}
                        </div>

                        {!isEditing && (
                            <Button type="submit" className="skip-button"
                                    onClick={() => navigate('/app/home')}>Skip</Button>
                            )
                        }

                        {selectedInterests.length >= minInterestsSelected && (
                            <Button type="submit"
                                    onClick={() => navigate('/app/home')}>Save</Button>
                            )
                        }
                    </div>
                </form>
            }
        </div>


    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        console.log(selectedInterests);
        apiInt.addInterests(selectedInterests, evReq.token).then(r => console.log(r));

        navigate('/app/home');
    }

    function handleInterestClick(interest: TInterest) {
        const isAlreadySelected = selectedInterests.includes(interest);

        const updatedInterests = isAlreadySelected
            ? selectedInterests.filter((selectedInterest) => selectedInterest !== interest)
            : [...selectedInterests, interest];

        setSelectedInterests(updatedInterests);
    }

    function renderInterests(interests: TInterest[]) {
        return interests && interests.length > 0 ? (
            interests.map((e) => (
                <InterestBlock
                    key={e.id} interest={e}
                    onChange={() => handleInterestClick(e)}
                    isSelected={selectedInterests.includes(e)}
                ></InterestBlock> //key to order the Block by their id
            ))
        ) : (
            <div>
                <p className={"error"}>No interests found!</p>
            </div>
        )

    }
}

