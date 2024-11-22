import React, { useState } from "react";
import axios from "axios";

function ProfileEditForm({ userProfile, setUserProfile, ingredients, setIsEditing }) {
  const handleImageChange = (e) => {
    setUserProfile((prev) => ({
      ...prev,
      profile_picture: e.target.files[0],
    }));
  };

  const handleIngredientChange = (ingredientId) => {
    const alreadySelected = userProfile.saved_ingredients.includes(ingredientId);
    setUserProfile((prev) => ({
      ...prev,
      saved_ingredients: alreadySelected
        ? prev.saved_ingredients.filter((id) => id !== ingredientId)
        : [...prev.saved_ingredients, ingredientId],
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const jsonData = {
      bio: userProfile.bio,
      saved_ingredients: userProfile.saved_ingredients,
    };
    const formData = new FormData();

    if (userProfile.profile_picture) {
      formData.append("profile_picture", userProfile.profile_picture);
    }
    formData.append("jsonData", JSON.stringify(jsonData));
    console.log("FormData being sent:", formData);

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/phases/profile/update/",
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
        saved_ingredients: response.data.saved_ingredients, 
        profile_picture: response.data.profile_picture, 
      });

      setIsEditing(false); 
      alert("Profile updated successfully!");

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
  <form onSubmit={handleUpdateProfile} className="flex flex-col items-center justify-center min-h-screen">
    <div className="bg-[rgba(255,182,193,0.3)] p-6 rounded-lg shadow-lg w-full sm:w-96">
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
    </div>
  </form>

  );
}

export default ProfileEditForm;
