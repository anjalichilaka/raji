import React, { useState } from "react";
import "./ProfileCard.css";

function ProfileCard() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
  };

  return (
    <div className="profile-card">
      <label className="profile-image-container">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          style={{ display: "none" }} 
        />
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profile-image" />
        ) : (
          <div className="default-image">50 x 50</div>
        )}
      </label>
      <h3>Name of the Faculty</h3>
      <p>Mail of the Faculty</p>
      {profileImage && (
        <button onClick={handleDeleteImage} className="delete-button">Delete Photo</button>
      )}
    </div>
  );
}

export default ProfileCard;
