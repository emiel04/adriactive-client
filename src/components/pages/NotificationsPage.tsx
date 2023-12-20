import Sheet from '@mui/joy/Sheet';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function NotificationsPage() {
    const navigate = useNavigate();

    useEffect(() => {

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