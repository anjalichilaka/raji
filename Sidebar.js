import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar({ activeSection, setActiveSection }) {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const menuItems = [
    {
      name: "Profile",
      subItems: [
        { name: "Dashboard" },
        { name: "All Complaints" },
        {
          name: "Complaints History",
          nestedItems: [
            { name: "Solved" },
            { name: "Pending" },
            { name: "Not Processed" },
          ],
        },
        { name: "Resolution Records" },
        { name: "Escalated Complaints" },
      ],
    },
    { name: "Reports" },
    { name: "Feedback" },
    {
      name: "Security",
      subItems: [{ name: "Change Password" }],
    },
    { name: "Help and Support" },
    { name: "Logout" },
  ];

  // Toggle submenu visibility
  const toggleSubmenu = (menuName) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  // Handle profile image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  // Handle profile image deletion
  const handleDeleteImage = () => {
    setProfileImage(null);
  };

  return (
    <aside className="sidebar">
      {/* Profile Section */}
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
          />
        </label>
        <h3>Name of the Faculty</h3>
        <p>Mail of the Faculty</p>
        {profileImage && (
          <button onClick={handleDeleteImage} className="delete-btn">
            🗑️ Delete Photo
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <div
                className={`menu-item ${activeSection === item.name ? "active" : ""}`}
                onClick={() => {
                  setActiveSection(item.name);
                  if (item.subItems) toggleSubmenu(item.name);
                }}
              >
                {item.name} {item.subItems && <span>{openSubmenus[item.name] ? "▼" : "▶"}</span>}
              </div>

              {item.subItems && openSubmenus[item.name] && (
                <ul className="submenu">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.name}
                      className={activeSection === subItem.name ? "active" : ""}
                      onClick={() => setActiveSection(subItem.name)}
                    >
                      {subItem.name}
                      {subItem.nestedItems && (
                        <ul className="nested-submenu">
                          {subItem.nestedItems.map((nestedItem) => (
                            <li
                              key={nestedItem.name}
                              className={activeSection === nestedItem.name ? "active" : ""}
                              onClick={() => setActiveSection(nestedItem.name)}
                            >
                              {nestedItem.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
