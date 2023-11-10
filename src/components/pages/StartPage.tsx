import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import Api from "../../services/api-interests.ts";
import {TInterest} from "../common/interest.tsx";
import InterestBlock from "../InterestBlock.tsx";
import {useNavigate} from "react-router";

export default function StartPage({isEditing} : {isEditing: boolean}) {

    const [interests, setInterests] = useState<TInterest[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        Api.getInterests(evReq.token).then(data => {
            setInterests(data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });

        return () => {
            evReq.cancel();
        }
    }, [])

    return <>
        <div className={"loading"}>
            {isLoading ? (
                <p>Loading...</p>
            ) : <>
            <div className="interests-page">
                <h2>{isEditing ? 'Change Interests' : 'Select Interests'}</h2>
                <h3>{isEditing ? '' : 'Select at least 3 categories or skip and finish later'}</h3>
                <div className="interests-grid">
                {renderInterests(interests)}
            </div>
                <button className="skip-button" onClick={() => navigate('/app/home')}>{isEditing ? 'Save' : 'Skip'}</button>
            </div>
            </>}
        </div>
    </>
}

function renderInterests(interests: TInterest[]) {
    return interests && interests.length > 0 ? (
        interests.map((e) => (
            <InterestBlock key={e.id} interest={e}></InterestBlock> //key to order the Block by their id
        ))
    ) : (
        <div>
            <p className={"error"}>No interests found!</p>
        </div>
    )

}
