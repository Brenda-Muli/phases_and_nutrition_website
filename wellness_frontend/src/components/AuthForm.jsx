import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../token";
import google from "../assets/google.png";
import pic from "../assets/pic.png";
import { motion } from "framer-motion";

const AuthForm = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");          
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
      const res = await api.post(route, { username, password, email });
      if (isLogin) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/home");
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
    <div className="relative flex h-screen overflow-hidden ">
      {/* Circle background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#fbd0d9] to-[#fef2f4] rounded-full z-0"
        initial={{ left: isLogin ? "50%" : "-40%", top: "-50%", width: "600px", height: "600px" }} 
        animate={{
          left: isLogin ? "60%" : "-20%",
          top: "10%",
          width: "850px", 
          height: "800px", 
        }}
        transition={{
          duration: 1.5, 
          ease: "easeInOut",
        }}
      />

      <div className="flex items-center justify-center w-full h-full relative z-10 pt-16 ">
        <motion.div
          className="flex items-center justify-center w-3/4 lg:w-1/2 rounded-lg shadow-lg bg-[rgba(255,182,193,0.3)] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Authentication Form */}
          <div className={`flex flex-col items-center justify-center w-1/2 p-6  ${isLogin ? "order-1" : "order-2"}`}>
            {loading && (
              <div>
                {error ? <span className="text-red-600">{error}</span> : <div></div>}
              </div>
            )}
            {!loading && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-[#b31d3f] text-xl mb-4 font-bold">{isLogin ? "LOGIN" : "SIGN UP"}</h2>
                {error && <div className="text-red-600 mb-2">{error}</div>}
                {success && <div className="text-green-600 mb-2">{success}</div>}
                {!isLogin && (
                  <>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="text-sm font-bold text-[#8d0e32]">EMAIL:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-[#8d0e32] rounded"
                      />
                    </div>
                  </>
                )}
                <div className="mb-4">
                  <label htmlFor="username" className="text-sm font-bold text-[#8d0e32]">USERNAME:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 border border-[#8d0e32] rounded"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="text-sm font-bold text-[#8d0e32]">PASSWORD:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-[#8d0e32] rounded"
                  />
                </div>
                <button type="submit" className="bg-[#d5294d] text-white p-2 rounded mb-4 w-full hover:bg-red-700">
                  {isLogin ? "Login" : "Register"}
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center bg-[#d5294d] text-white p-2 rounded w-full hover:bg-red-700"
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

          {/* Image Section */}
          <motion.div
            className={`flex items-center justify-center w-1/2 h-full ${isLogin ? "order-2" : "order-1"}`}
            initial={{ x: isLogin ? 100 : -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={pic} alt="Description" className="w-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthForm;
