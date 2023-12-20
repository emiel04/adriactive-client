import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import apiInt from "../../services/api-interests.ts";
import InterestBlock from "../InterestBlock.tsx";
import Button from '@mui/joy/Button';
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";
import apiUser from "../../services/api-user.ts";
import {TCategory} from "../common/category.tsx";

export default function InterestPage() {
    const [interests, setInterests] = useState<TCategory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedInterests, setSelectedInterests] = useState<TCategory[]>([]);
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
    }, [isEditing])

    useEffect(() => {
        const editing = searchParams.get('editing');
        setIsEditing(editing === "true");
        console.log(editing);
        function preSelectInterests() {
            apiUser.getUserInterests(evReq.token)
                .then(interests => {
                    console.log(interests);
                    setSelectedInterests(interests);
                    console.log(selectedInterests);
                })
                .catch(() => {});
        }
        if (isEditing) {
            preSelectInterests();
        }


    }, [searchParams, isEditing]);



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
        apiInt.addInterests(selectedInterests, evReq.token).then(r => console.log(r));

        navigate('/app/home');
    }

    function handleInterestClick(interest: TCategory) {
        const isAlreadySelected = selectedInterests.includes(interest);

        const updatedInterests = isAlreadySelected
            ? selectedInterests.filter((selectedInterest) => selectedInterest !== interest)
            : [...selectedInterests, interest];

        setSelectedInterests(updatedInterests);
    }

    function renderInterests(interests: TCategory[]) {
        console.log(interests)
        return interests && interests.length > 0 ? (
            interests.map((e) => (
                <InterestBlock
                    key={e.categoryId} interest={e}
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

