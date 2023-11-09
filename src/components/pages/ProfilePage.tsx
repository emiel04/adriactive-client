import "../../assets/css/profilepage.scss"
import {useEffect, useState} from "react";
import {TInterest} from "../common/interest.tsx";
import axios, {CancelTokenSource} from "axios";
import evApi from "../../services/api-user.ts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {TUser} from "../common/user.tsx";

function ProfilePage() {
    const [interests, setInterests] = useState<TInterest[]>([]);
    const [user, setUser] = useState<TUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        evApi.getUserInterests(evReq.token).then(data => {
            setInterests(data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });

        evApi.getUser(evReq.token).then(data => {
            setUser(data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });

        return () => {
            evReq.cancel();
        }
    }, [])

    function renderInterests(interests: TInterest[]) {
        return interests && interests.length > 0 ? (
            interests.map((e) => (
                    e.name
            ))
        ) : (
            <div>
                <p className={"error"}>No interests found!</p>
            </div>
        )


    }

    function renderUser(user: TUser[]) {
        return user && user.length > 0 ? (
            user.map((e) => (
                e.firstName
            ))
        ) : (
            <div>
                <p className={"error"}>No interests found!</p>
            </div>
        )


    }

    return <>
        <div className={"loading"}>
            {isLoading ? (
                <p>Loading...</p>
            ) : <>
        <div className="profile-page">
            <button className="edit-button">Edit</button>
            <div className="profile-info">
                <div className="profile-picture">
                    <AccountCircleIcon></AccountCircleIcon>
                </div>
                <div className="name">
                    {renderUser(user)}
                </div>
            </div>
            <div className="interests-list">
                <h2>Interest List</h2>
                <div className="list-container">
                    {renderInterests(interests)}
                </div>
            </div>
        </div>
            </>}
        </div>
    </>
}

export default ProfilePage;