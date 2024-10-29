import React from "react"
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import AuthPage from "./pages/AuthPage"
import { useAuthentication } from "./auth"
import NotFound from "./pages/NotFound"
import RedirectGoogleAuth from "./components/GoogleRedirectHandler"
import './index.css'


function App() {

  const {isAuthorized} = useAuthentication()
  const ProtectedLogin = () => {
    return isAuthorized ? <Navigate to = "/" /> : <AuthPage initialMethod= "login"/>
  }

  const ProtectedRegister = () => {
    return isAuthorized ? <Navigate to = "/" /> : <AuthPage initialMethod= "register"/>
  }
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/login/callback" element = {<RedirectGoogleAuth />} />
      <Route path="/login/" element = {<ProtectedLogin />} />
      <Route path="/register" element = {<ProtectedRegister />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
