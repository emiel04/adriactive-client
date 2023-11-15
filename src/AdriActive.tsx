import {Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/common/navbar";
import HomePage from "./components/pages/HomePage";
import "./assets/css/homepage.css";
import "./assets/css/myEventsPage.css"
import MapPage from "./components/pages/MapPage";
import MyEventsPage from "./components/pages/MyEventsPage.tsx";
import "./assets/css/interestspage.scss";
import NotFound from "./components/common/404.tsx";
import "./assets/css/events.scss";
import InterestPage from "./components/pages/InterestPage.tsx";
import ProfilePage from "./components/pages/ProfilePage.tsx";
import CreateEventPage from "./components/pages/CreateEventPage.tsx";
import ViewEventPage from "./components/pages/ViewEventPage.tsx";

function AdriActive () {
    return <>
        <Routes>
            <Route path={"/profile"} element={<ProfilePage/>}></Route>
            <Route path={"/"} element={<Navigate to={"/app/home"}/>}></Route>
            <Route path={"/home"} element={<HomePage/>}></Route>
            <Route path={"/search"} element={<p>Search</p>}></Route>
            <Route path={"/map"} element={<MapPage/>}></Route>
            <Route path={"/events"} element={<MyEventsPage/>}></Route>
            <Route path={"/notifications"} element={<p>Notifications</p>}></Route>
            <Route path={"/interests"} element={<InterestPage/>}></Route>
            <Route path={"/event/create"} element={<CreateEventPage/>}></Route>
            <Route path={"/event/view/:id"} element={<ViewEventPage/>}></Route>
            <Route path={"*"} element={<NotFound/>}></Route>
        </Routes>
        <Navbar></Navbar>
    </>
}

export default AdriActive;