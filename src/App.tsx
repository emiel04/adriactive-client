import './assets/css/app.css'
import { Route, Routes } from "react-router-dom"
import AdriActive from "./AdriActive";

function App() {
  return (
      <Routes>
          <Route path="/" element={AdriActive} />
      </Routes>
  )
}



export default App
