import {Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/common/navbar";
import HomePage from "./components/pages/HomePage";
import "./assets/css/homepage.css";
import "./assets/css/map.css"
import MapPage from "./components/pages/MapPage";

function AdriActive () {
    return <>
        <Routes>
            <Route path={"/"} element={<Navigate to={"/app/home"}/>}></Route>
            <Route path={"/home"} element={<HomePage/>}></Route>
            <Route path={"/search"} element={<p>Search</p>}></Route>
            <Route path={"/map"} element={<MapPage/>}></Route>
            <Route path={"/events"} element={<p>Events</p>}></Route>
            <Route path={"/notifications"} element={<p>Notifications</p>}></Route>
        </Routes>
        <Navbar></Navbar>
    </>
}

export default AdriActive();