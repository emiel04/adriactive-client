import {TNotification} from "./common/notification.tsx";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Card from "@mui/joy/Card";
import {useNavigate} from "react-router-dom";


type TNotificationBlockProps = {
    notification: TNotification;
    onClick: () => void;
};
export default function NotificationBlock(prop: TNotificationBlockProps) {
    const navigate = useNavigate();
    return (
        <Card
            onClick={() => navigate(`/app/event/view/${prop.notification.eventId}`)}
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
                    {prop.notification.title}
                </Typography>
                <Typography level="body-sm">{dateToTimeAgo(prop.notification.startTime)}</Typography>
                <Chip>
                    {prop.notification.description}
                </Chip>
            </CardContent>
        </Card>
    )

    function dateToTimeAgo(startTime: number): string {
        const currentDate = new Date();
        const notificationDate = new Date(startTime * 1000);
        const timeDifference = currentDate.getTime() - notificationDate.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d ago`;
        } else if (hours > 0) {
            return `${hours}h ago`;
        } else if (minutes > 0) {
            return `${minutes}m ago`;
        } else {
            return `${seconds}s ago`;
        }
    }


}