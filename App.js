import React, { useState } from "react";
import Sidebar from "./Sidebar";
import EscalatedComplaints from "./EscalatedComplaints";
import "./App.css"; // Ensure CSS is imported

function App() {
  const [activeSection, setActiveSection] = useState("Dashboard");

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="content">
        {activeSection === "Dashboard" && (
          <div className="top-centered-content">
            <h1>Welcome to Dashboard</h1>
          </div>
        )}
        {activeSection === "Escalated Complaints" && <EscalatedComplaints />}
      </main>
    </div>
  );
}

export default App;
