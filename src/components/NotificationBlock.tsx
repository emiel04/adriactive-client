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
            onClick={() => navigate(`/app/event/view/${prop.notification.id}`)}
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
                <Typography level="body-sm">{prop.notification.startTime}</Typography>
                <Chip>
                    {prop.notification.description}
                </Chip>
            </CardContent>
        </Card>
    )

}