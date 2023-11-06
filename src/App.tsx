import './assets/css/app.css'
import {Navigate, Route, Routes} from "react-router-dom";
import AdriActive from "./AdriActive";

function App() {
  return (
      <Routes>
          <Route path={"/"} element={<Navigate to={"/app"}/>}></Route>
          <Route path="/app/*" element={AdriActive} />
          <Route path="*" element={<p>404 not found</p>} />
      </Routes>
  )
}



export default App
