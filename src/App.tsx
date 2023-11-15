import './assets/css/app.css'
import {Navigate, Route, Routes} from "react-router-dom";
import AdriActive from "./AdriActive";
import { CssVarsProvider } from '@mui/joy/styles';
import NotFound from "./components/common/404";
import {PrivateRoute} from "./components/PrivateRoute";
import theme from "./assets/theme";
import {WebSocketProvider} from "./components/context/WebSocketContext";



function App() {

    return (
        <>
            <CssVarsProvider theme={theme}>
                <WebSocketProvider>
                    <Routes>
                        <Route path={"/"} element={<Navigate to={"/app"}/>}></Route>
                        <Route path="/app/*" element={
                            <PrivateRoute>
                                <AdriActive></AdriActive>
                            </PrivateRoute>
                        } />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </WebSocketProvider>
            </CssVarsProvider>

        </>
    )
}

export default App
