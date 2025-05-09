import React, { useState } from "react";
import "./Profile.css";

function Profile() {
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
    <aside className="sidebar">
      <div className="profile">
        <label className="profile-pic-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <img
            src={profileImage || "https://via.placeholder.com/50"}
            alt="Profile"
            className="profile-pic"
            onClick={() => document.querySelector("input[type=file]").click()}
          />
        </label>
        <div className="profile-info">
          <h3 className="profile-name">Sruthi Sree</h3>
          <p className="profile-email">22bq1a0542@vvit.net</p>
        </div>
        {profileImage && (
          <button onClick={handleDeleteImage} className="delete-btn">
            🗑️
          </button>
        )}
      </div>
    </aside>
  );
}

export default Profile;
