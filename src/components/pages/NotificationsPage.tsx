import Sheet from '@mui/joy/Sheet';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import noApi from "../../services/api-notifications.ts";
import axios, {CancelTokenSource} from "axios";
import {TNotification} from "../common/notification.tsx";
import NotificationBlock from "../NotificationBlock.tsx";
import "../../assets/css/notifications.scss";
function NotificationsPage() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState<TNotification[]>([])

    useEffect(() => {
        const evReq: CancelTokenSource = axios.CancelToken.source();
        noApi.getNotifications(evReq.token).then(data => {
            setNotifications(data);
        }).catch(() => {
        });

        return () => {
            evReq.cancel();
        }
    }, []);

    return (
        <div
            id={"notification-box"}
        >
        <Sheet className={"sheet"} variant="outlined" color="neutral" >
            {renderNotifications(notifications)}
        </Sheet>
        </div>
    );

    function renderNotifications(notifications: TNotification[]) {
        return notifications && notifications.length > 0 ? (
            notifications.map(n => {
                return <NotificationBlock key={n.id} notification={n} onClick={() => navigate(`/app/events/view/${n.eventId}`)}></NotificationBlock>
            })
    ) : (
            <div>
                <p className={"error"}>No notifications found!</p>
            </div>
        )
    }
}

export default NotificationsPage;