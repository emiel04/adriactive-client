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
            ) : (
                renderInterests(interests)
            )}
        </div>
    </>
}

function renderInterests(interests: TInterest[]) {
    return interests && interests.length > 0 ? (
        interests.map((e) => (
            <InterestBlock key={e.id} interest={e}></InterestBlock>
        ))
    ) : (
        <div>
            <p className={"error"}>No interests found!</p>
        </div>
    )

}
