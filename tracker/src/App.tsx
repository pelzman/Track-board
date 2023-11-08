
import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import About from "./component/about/About"
import SignUp from "./pages/auth/SignUp"
import Login from "./pages/auth/Login"

function App() {
  return (
   
   <Routes>
      <Route path="/" element={(<SignUp />)} />
      <Route path="/login" element={(<Login />)} />
      <Route path="/home" element={(<Home />)} />
      <Route path="/about" element={(<About />)} />

    </Routes>
   
   
  )
}

export default App


