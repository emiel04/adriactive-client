import {NavLink} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/joy/Badge';

export default function Navbar() {
    return <nav className={"navbar"}>
        <ul>
        <li>
            <NavLink to={"/app/profile"} className={({isActive}) => isActive ? "active" : ""}>
                <AccountCircleIcon></AccountCircleIcon>
            </NavLink>
        </li>
        <li>
            <NavLink to={"/app/home"} className={({isActive}) => isActive ? "active" : ""}>
            Home
            </NavLink>
        </li>
        <li>
            <NavLink to={"/app/map"} className={({isActive}) => isActive ? "active" : ""}>
            Map
            </NavLink>
        </li>
        <li>
            <NavLink to={"/app/events"} className={({isActive}) => isActive ? "active" : ""}>
            Events
            </NavLink>
        </li>
            <Badge badgeContent={1} variant="solid">
        <li>
            <NavLink to={"/app/notifications"} className={({isActive}) => isActive ? "active" : ""}>
            Notifications
            </NavLink>
        </li>
            </Badge>
        </ul>
    </nav>;
}