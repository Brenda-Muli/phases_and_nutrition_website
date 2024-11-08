import React from "react"
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import AuthPage from "./pages/AuthPage"
import { useAuthentication } from "./auth"
import NotFound from "./pages/NotFound"
import RedirectGoogleAuth from "./components/GoogleRedirectHandler"
import BlogPostList from "./components/BlogPostList"
import BlogPostDetail from "./components/BlogPostDetail"
import BlogFeatured from "./components/BlogFeatured"
import BlogPostCategory from "./components/BlogPostCategory"
import Header from "./components/Header"
import './index.css'
import MenstrualPhase from "./components/MenstrualPhase"


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
      <Route path="/home" element={<Home />} />
      <Route path="/" element = {<Header />} />
      <Route path="/phases/:slug" element ={<MenstrualPhase />} />
      <Route path="/blog" element={<BlogPostList />} />
      <Route path="/blog/:slug" element={<BlogPostDetail />} />
      <Route path="/featured" element={<BlogFeatured />} />
      <Route path="/blog/category" element={<BlogPostCategory />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
