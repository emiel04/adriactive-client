import './assets/css/app.css'
import { Route, Routes } from "react-router-dom"
import AdriActive from "./AdriActive";

function App() {
  return (
      <Routes>
          <Route path="/app/*" element={AdriActive} />
          <Route path="*" element={<p>404 not found</p>} />
      </Routes>
  )
}



export default App
