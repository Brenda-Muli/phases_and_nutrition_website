import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileEditForm from "./ProfileEditForm";
import { useLocation } from "react-router-dom";

function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    bio: "",
    profile_picture: null,
    saved_ingredients: [],
  });
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  // Get selectedIngredients from location state
  const location = useLocation();
  const { selectedIngredients: locationIngredient } = location.state || { selectedIngredients: [] };

  // Axios instance with interceptors
  const axiosInstance = axios.create();

  // Add request interceptor to attach token to requests
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access");
      console.log("Token from localStorage:", token); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor to handle token expiration
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem("refresh");
          if (refreshToken) {
            const response = await axios.post("http://localhost:8000/api/token/refresh/", {
              refresh: refreshToken,
            });
            localStorage.setItem("access", response.data.access);

            // Update axios default headers with the new access token
            axiosInstance.defaults.headers["Authorization"] = `Bearer ${response.data.access}`;
            
            // Retry the original request with the new token
            originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;
            return axiosInstance(originalRequest);
          } else {
            throw new Error("No refresh token available");
          }
        } catch (err) {
          console.error("Error refreshing token", err);
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login"; 
        }
      }
      return Promise.reject(error);
    }
  );

  // Fetch user profile and ingredients
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await axios.get("http://localhost:8000/api/phases/profile/", 
          { headers: { Authorization: `Bearer ${localStorage.getItem("access")}` } }
        );
      const {bio, profile_picture, saved_ingredients} = profileResponse.data;
        setUserProfile({
        bio, profile_picture, saved_ingredients
        });
        setSelectedIngredients(saved_ingredients || []);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch phase-specific ingredients
  useEffect(() => {
    const fetchPhaseIngredients = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/phases/profile/ingredients/', 
          { headers: { Authorization: `Bearer ${localStorage.getItem("access")}` } }
        );
        setSelectedIngredients(response.data);
      } catch (error) {
        console.error("Error fetching phase-specific ingredients:", error);
        setError("Error fetching phase ingredients. Please try again later.");
      }
    };

    fetchPhaseIngredients();
  }, []); 

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container mt-5">
      {error && (
        <div className="alert alert-danger">
          <p>{error}</p>
        </div>
      )}

      {isEditing ? (
        <ProfileEditForm
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          ingredients={ingredients}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="profile-details">
          {/* Profile Picture */}
          <div className="profile-picture mb-4">
            <img
              src={
                userProfile.profile_picture
                  ? userProfile.profile_picture
                  : "/photos/defaultprofile.JPG"
              }
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>

          {/* Profile Info */}
          <div className="profile-info mb-4">
            <p className="text-xl font-semibold">{userProfile.username}</p>
            <p className="text-md text-gray-600">{userProfile.bio || "No bio available."}</p>
          </div>


          {/* Selected Ingredients (from location state) */}
          <div className="selected-ingredients">
            <h3 className="font-semibold">Recently Selected Ingredients:</h3>
            <ul>
              {selectedIngredients.length > 0 ? (
                selectedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="mb-2">
                    <h4 className="text-md font-semibold">{ingredient.name}</h4>
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </li>
                ))
              ) : (
                <p>No ingredients selected yet.</p>
              )}
            </ul>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
          >
            Change Profile Data
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
