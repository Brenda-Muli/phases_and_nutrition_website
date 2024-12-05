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

  // Get selectedIngredients from location state (if passed)
  const location = useLocation();
  const { selectedIngredients: locationIngredient } = location.state || { selectedIngredients: [] };

  const axiosInstance = axios.create();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const access = localStorage.getItem("access");
      if (!access) {
        console.error("Access token is missing.");
        window.location.href = "/login"; 
        return;
      }

      try {
        const profileResponse = await axiosInstance.get(`https://wellness-backend-fetu.onrender.com/api/phases/profile/`, {
          headers: { Authorization: `Bearer ${access}` }
        });

        // Accessing profile data correctly from the response
        const { bio, profile_picture, saved_ingredients } = profileResponse.data.profile;
        
        // Ensure that the profile_picture URL is formatted correctly 
        const formattedProfilePicture = profile_picture && profile_picture.startsWith('https://res.cloudinary.com') 
          ? profile_picture 
          : `/photos/defaultprofile.JPG`; 
        setUserProfile({ bio, profile_picture: formattedProfilePicture, saved_ingredients });
        setSelectedIngredients(saved_ingredients || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(error.response ? error.response.data.message : "Error fetching profile data. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container mt-5 px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="alert alert-danger">
          <p>{error}</p>
        </div>
      )}
  
      {isEditing ? (
        <ProfileEditForm
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          ingredients={selectedIngredients}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="profile-details pt-16">
          {/* Profile Picture */}
          <div className="profile-picture mb-4 flex justify-center">
            <img
              src={userProfile.profile_picture ? userProfile.profile_picture : "/photos/defaultprofile.JPG"}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full"
            />
          </div>
  
          {/* Profile Info */}
          <div className="profile-info mb-4 text-center">
            <p className="text-black italic font-semibold mb-2">{userProfile.bio || "No bio available."}</p>
          </div>
  
          {/* Saved Ingredients */}
          <div className="selected-ingredients">
            <h3 className="font-semibold text-[#8d0e32] mb-2 text-center">Saved Ingredients:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center">
              {selectedIngredients.length > 0 ? (
                selectedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="mb-4 text-center">
                    <h4 className="text-md font-semibold">{ingredient.name}</h4>
                    <img
                      src={ingredient.image ? ingredient.image : "/images/default-ingredient.jpg"}
                      alt={ingredient.name}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  </li>
                ))
              ) : (
                <p className="text-center">No saved ingredients yet.</p>
              )}
            </ul>
          </div>
  
          {/* Edit Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-[#d5294d] text-white rounded w-full sm:w-auto hover:bg-red-700"
            >
              Change Profile Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default ProfilePage;
