import './assets/css/app.css'
import {Navigate, Route, Routes} from "react-router-dom";
import AdriActive from "./AdriActive";
import { CssVarsProvider } from '@mui/joy/styles';
import NotFound from "./components/common/404";
import {PrivateRoute} from "./components/PrivateRoute";
import {useEffect} from "react";
import EventBus from "@vertx/eventbus-bridge-client.js";
import URI from "./api";
import theme from "./assets/theme";


const CHNL_TO_CLIENTS_BROADCAST = "events.to.users";

function App() {

    useEffect(() => {
        const eb = new EventBus(URI + "/events");

        eb.onopen = () => {
            console.log("Opening");
            eb.registerHandler(CHNL_TO_CLIENTS_BROADCAST, onMessage);
        }

        function onMessage(error: Error, message: any) {
            if(error){
                console.error(error);
            }
            console.log(message.body);
        }
        return () =>{
            eb.close();
        }
    })


    return (
        <>
            <CssVarsProvider theme={theme}>
                <Routes>
                    <Route path={"/"} element={<Navigate to={"/app"}/>}></Route>
                    <Route path="/app/*" element={
                        <PrivateRoute>
                            <AdriActive></AdriActive>
                        </PrivateRoute>
                    } />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </CssVarsProvider>

        </>
    )
}

export default App
