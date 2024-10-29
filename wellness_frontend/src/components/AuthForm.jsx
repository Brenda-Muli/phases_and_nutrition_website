import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../token";
import google from "../assets/google.png";
import picture from "../assets/picture.png";
import { motion } from "framer-motion";

const AuthForm = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLogin, setIsLogin] = useState(method === "login");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(method === "login");
  }, [method]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await api.post(route, { username, password });
      if (isLogin) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
        window.location.reload();
      } else {
        setSuccess("Registration successful. Please login.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setError(error.response.status === 401 
          ? "Invalid credentials" 
          : error.response.status === 400 
          ? "Username already exists" 
          : "Something went wrong. Please try again."
        );
      } else {
        setError("Network error. Please check your internet connection");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/accounts/google/login/";
  };


  return (
    <div className="flex h-screen">
      {/* Form Section - Switches based on isLogin */}
      <motion.div
        className={`flex items-center justify-center w-1/2 ${isLogin ? "order-1" : "order-2"}`}
        initial={{ x: isLogin ? -100 : 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 rounded-lg shadow-md w-96">
          {loading && (
            <div>
              {error ? <span className="text-red-600">{error}</span> : <div></div>}
            </div>
          )}
          {!loading && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-pink-700 text-xl mb-4 font-bold">{isLogin ? "LOGIN" : "SIGN UP"}</h2>
              {error && <div className="text-red-600 mb-2">{error}</div>}
              {success && <div className="text-green-600 mb-2">{success}</div>}
              <div className="mb-4">
                <label htmlFor="username" className="text-sm font-bold">USERNAME:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-2 border border-pink-400 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-sm font-bold">PASSWORD:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-pink-400 rounded"
                />
              </div>
              <button type="submit" className="bg-pink-700 text-white p-2 rounded mb-4 w-full hover:bg-pink-400">
                {isLogin ? "Login" : "Register"}
              </button>
              <button
                type="button"
                className="flex items-center justify-center bg-red-700 text-white p-2 rounded w-full hover:bg-pink-400"
                onClick={handleGoogleLogin}
              >
                <img src={google} alt='google icon' className="w-5 h-5 mr-2" />
                {isLogin ? "Login with Google" : "Register with Google"}
              </button>
              <p className="text-center mt-4">
                {isLogin ? "Do not have an account?" : "Already have an account?"}
                <span 
                  className="text-red-600 cursor-pointer" 
                  onClick={() => navigate(isLogin ? "/register" : "/login")}
                >
                  {isLogin ? " Register" : " Login"}
                </span>
              </p>
            </form>
          )}
        </div>
      </motion.div>

      {/* Shape and Image Section - Switches based on isLogin */}
      <motion.div
        className={`relative flex flex-col items-center justify-center w-1/2 ${isLogin ? "order-2" : "order-1"}`}
        initial={{ x: isLogin ? 100 : -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={picture} alt="Description" width="400" />
      </motion.div>
    </div>
  );
};

export default AuthForm;
