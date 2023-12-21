import Sheet from '@mui/joy/Sheet';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import noApi from "../../services/api-notifications.ts";
import axios, {CancelTokenSource} from "axios/index";
import {TNotification} from "../common/notification.tsx";
import NotificationBlock from "../NotificationBlock.tsx";

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
        <Sheet variant="outlined" color="neutral" sx={{ p: 4 }}>
            {renderNotifications(notifications)}
        </Sheet>
    );

    function renderNotifications(notifications: TNotification[]) {
        return notifications && notifications.length > 0 ? (
            notifications.map(n => {
                <NotificationBlock key={n.id} notification={n} onClick={() => navigate(`/app/event/view/${n.id}`)}></NotificationBlock>
            })
    ) : (
            <div>
                <p className={"error"}>No notifications found!</p>
            </div>
        )
    }
}

export default NotificationsPage;