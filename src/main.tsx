import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const getBaseName = () => {
    // Check if the app is running locally or on the server
    if (process.env.NODE_ENV === 'development') {
        return '/';
    } else {
        return '/2023-2024/group-10/';
    }
};


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename={getBaseName()}>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)
