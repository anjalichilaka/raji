import React, { useState, useEffect } from "react";
import "./ComplaintsHistory.css";

const ComplaintsHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/complaints"); // API URL
        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "In Process":
        return "status-in-process";
      case "Closed":
        return "status-closed";
      case "Not Process Yet":
        return "status-not-processed";
      default:
        return "";
    }
  };

  if (loading) return <p>Loading complaints...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="complaints-history">
      <h2>Your Complaint History</h2>
      <table>
        <thead>
          <tr>
            <th>Complaint Number</th>
            <th>Reg Date</th>
            <th>Last Update Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{new Date(complaint.regDate).toLocaleString()}</td>
              <td>{new Date(complaint.lastUpdate).toLocaleString()}</td>
              <td>
                <span className={`status-label ${getStatusClass(complaint.status)}`}>
                  {complaint.status}
                </span>
              </td>
              <td>
                <button className="view-details-btn">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsHistory;
