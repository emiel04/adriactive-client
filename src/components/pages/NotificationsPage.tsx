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
            <Card
                onClick={() => navigate(`/event/view/${e.id}`)} //TODO: link notification to event
                variant="outlined"
                orientation="horizontal"
                sx={{
                    width: 320,
                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                }}
            >
                <NotificationsActiveIcon/>
                <CardContent>
                    <Typography level="title-lg" id="notification-description">
                        Event cancellation!
                    </Typography>
                    <Typography level="body-sm">2 minutes ago</Typography>
                    <Chip>
                        The event: X was canceled
                    </Chip>
                </CardContent>
            </Card>
        </Sheet>
    );
}

export default NotificationsPage;