import "../../assets/css/profilepage.scss"
import {useEffect, useState} from "react";
import {TInterest} from "../common/interest.tsx";
import axios, {CancelTokenSource} from "axios";
import evApi from "../../services/api-user.ts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {TUser} from "../common/user.tsx";
import {useNavigate} from "react-router";
import UserBlock from "../UserBlock.tsx";

function ProfilePage() {
    const [interests, setInterests] = useState<TInterest[]>([]);
    const [user, setUser] = useState<TUser>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

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

    function renderUserInterests(interests: TInterest[]) {
        return interests && interests.length > 0 ? (
            interests.map((e) => (
                    <p key={e.name}>{e.name}</p>
            ))
        ) : (
            <div>
                <p className={"error"}>No interests found!</p>
            </div>
        )
    }

    function renderUser(user: TUser | undefined) {
        return user ? (
                <UserBlock user={user}></UserBlock>
        )
         : (
            <div>
                <p className={"error"}>No User found!</p>
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
                <form className="list-container">
                    {renderUserInterests(interests)}
                </form>
                <button className="edit-interests" onClick={() => navigate('')}>Edit interests</button>
            </div>
        </div>
            </>}
        </div>
    </>
}

export default ProfilePage;