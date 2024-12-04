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

// ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  const { isAuthorized } = useAuthentication(); 
  return isAuthorized ? element : <Navigate to="/login" />; 
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login/callback" element={<RedirectGoogleAuth />} />
        <Route path="/login" element={<ProtectedLogin />} />
        <Route path="/register" element={<ProtectedRegister />} />
        
        {/* Protected routes */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/calendar" element={<ProtectedRoute element={<CycleCalendar />} />} />
        <Route path="/calendarform" element={<ProtectedRoute element={<MenstrualDataForm />} />} />
        
        {/* Protected Blog and Phase Slug Routes */}
        <Route path="/blog" element={<ProtectedRoute element={<BlogPostList />} />} />
        <Route path="/blog/:slug" element={<ProtectedRoute element={<BlogPostDetail />} />} />
        <Route path="/phases/:slug" element={<ProtectedRoute element={<PhaseDetail />} />} />
        
        {/* Public routes */}
        <Route path="/" element={<Header />} />
        <Route path="/featured" element={<BlogFeatured />} />
        <Route path="/blog/category" element={<BlogPostCategory />} />
        
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// ProtectedLogin Component 
const ProtectedLogin = () => {
  const { isAuthorized } = useAuthentication();
  return isAuthorized ? <Navigate to="/home" /> : <AuthPage initialMethod="login" />;
};

// ProtectedRegister Component 
const ProtectedRegister = () => {
  const { isAuthorized } = useAuthentication();
  return isAuthorized ? <Navigate to="/login" /> : <AuthPage initialMethod="register" />;
};

export default App;
