import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";

function ProfileEditForm({ userProfile, setUserProfile, setIsEditing }) {
  const [alertMessage, setAlertMessage] = useState(""); 
  const [showAlert, setShowAlert] = useState(false); 

  const handleImageChange = (e) => {
    setUserProfile((prev) => ({
      ...prev,
      profile_picture: e.target.files[0],
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("bio", userProfile.bio);

    if (userProfile.profile_picture) {
      formData.append("profile_picture", userProfile.profile_picture);
    }

    console.log("FormData being sent:", formData);

    try {
      const response = await axios.patch(
        `https://wellness-backend-fetu.onrender.com/api/phases/profile/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      console.log("Profile updated response:", response.data);
      setUserProfile({
        ...userProfile,
        bio: response.data.bio,
        profile_picture: response.data.profile_picture, 
      });

      setIsEditing(false); 
      setAlertMessage("Profile updated successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

    } catch (error) {
      console.error("Error updating profile:", error);
      setAlertMessage("Failed to update profile.");
      setShowAlert(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {showAlert && (
        <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
      <form onSubmit={handleUpdateProfile} className="bg-[rgba(255,182,193,0.3)] p-6 rounded-lg shadow-lg w-full sm:w-96">
        <div className="form-group mb-4">
          <label htmlFor="bio" className="block font-semibold text-[#8d0e32] mb-2">
            Update Bio
          </label>
          <textarea
            id="bio"
            value={userProfile.bio || ""}
            onChange={(e) =>
              setUserProfile((prev) => ({ ...prev, bio: e.target.value }))
            }
            className="w-full p-2 border border-[#8d0e32] rounded"
            rows="4"
            placeholder="Update your bio..."
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="profile_picture" className="block font-semibold text-[#8d0e32] mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            id="profile_picture"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-2 border border-[#8d0e32] rounded"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-[#d5294d] text-white rounded w-full hover:bg-red-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileEditForm;
