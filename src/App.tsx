import './assets/css/app.css'
import {Navigate, Route, Routes} from "react-router-dom";
import AdriActive from "./AdriActive";

import {ReactNode, useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import NotFound from "./components/common/404";



function PrivateRoute({ children } : {children: ReactNode}) {

    const [authenticated, setAuthenticated] = useState(false);
    //set the adriaId
    let adriaId = localStorage.getItem("adriaId");
    if (!adriaId){
        adriaId = uuidv4();
        localStorage.setItem("adriaId", adriaId);
        setAuthenticated(true);
    }
    useEffect(() => {
        if (localStorage.getItem("adriaId")){
            setAuthenticated(true);
        }
    }, [authenticated])

    return authenticated ? children : <p>Logging in...</p>;
}

function App() {
  return (
      <>
          <Routes>
              <Route path={"/"} element={<Navigate to={"/app"}/>}></Route>
                  <Route path="/app/*" element={
                      <PrivateRoute>
                        <AdriActive></AdriActive>
                      </PrivateRoute>
                  } />
              <Route path="*" element={<NotFound/>} />
          </Routes>
      </>
  )
}



export default App
