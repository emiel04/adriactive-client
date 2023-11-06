import {Route, Routes} from "react-router-dom";
import Navbar from "./components/common/navbar";

function HomePage() {
    return <>
        <h1>Homepage</h1>

    </>;
}



function AdriActive () {
    return <>
        <Routes>
            <Route path={"/"} element={<HomePage/>}></Route>
        </Routes>
        <Navbar></Navbar>
    </>
}

export default AdriActive();