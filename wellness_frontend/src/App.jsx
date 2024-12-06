import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AuthPage from "./pages/AuthPage";
import { useAuthentication } from "./auth"; 
import NotFound from "./pages/NotFound";
import RedirectGoogleAuth from "./components/GoogleRedirectHandler";
import BlogPostList from "./components/BlogPostList";
import BlogPostDetail from "./components/BlogPostDetail";
import BlogFeatured from "./components/BlogFeatured";
import BlogPostCategory from "./components/BlogPostCategory";
import Header from "./components/Header";
import './index.css';
import PhaseDetail from "./components/PhaseDetail";
import UserProfile from "./components/ProfilePage";
import CycleCalendar from "./components/CycleCalendar";
import MenstrualDataForm from "./components/MenstrualDataForm";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login/callback" element={<RedirectGoogleAuth />} />
        <Route path="/login" element={<ProtectedLogin />} />
        <Route path="/register" element={<ProtectedRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Header />} />
        <Route path="/phases/:slug" element={<PhaseDetail />} />
        <Route path="/blog" element={<BlogPostList />} />
        <Route path="/blog/:slug" element={<BlogPostDetail />} />
        <Route path="/featured" element={<BlogFeatured />} />
        <Route path="/blog/category" element={<BlogPostCategory />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/calendar" element={<CycleCalendar />} />
        <Route path="/calendarform" element={<MenstrualDataForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedLogin = () => {
  const { isAuthorized, loading } = useAuthentication(); 

  if (loading) {
    
    return <div>....</div>;
  }

  return isAuthorized ? <Navigate to="/home" replace /> : <AuthPage initialMethod="login" />;
};


const ProtectedRegister = () => {
  const { isAuthorized } = useAuthentication();
  return isAuthorized ? <Navigate to="/login" /> : <AuthPage initialMethod="register" />;
};

export default App;
