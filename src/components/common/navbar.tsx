import {NavLink} from "react-router-dom";

export default function Navbar() {
    return <nav className={"navbar"}><ul>
        <li><NavLink to={"/app"} className={""}>Home</NavLink></li>
        <li><NavLink to={"/app"} className={""}>Home</NavLink></li>
    </ul></nav>;
}