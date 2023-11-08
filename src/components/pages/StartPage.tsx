import {useEffect, useState} from "react";
import axios, {CancelTokenSource} from "axios";
import evApi from "../../services/api-interests.ts";
import {TInterest} from "../common/interest.tsx";
import InterestBlock from "../InterestBlock.tsx";

export default function StartPage() {

    const [interests, setInterests] = useState<TInterest[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApi.getInterests(evReq.token).then(data => {
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
                <div className="interests-grid">
                <h2>Select Interests</h2>
                <h3>Select at least 3 categories or skip and finish later</h3>
                {renderInterests(interests)}
                <button className="skip-button">Skip</button>
            </div>
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
