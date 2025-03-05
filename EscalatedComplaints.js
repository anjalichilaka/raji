import React, { useState, useEffect } from "react";
import "./EscalatedComplaints.css";

function EscalatedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [formData, setFormData] = useState({
    assignedTo: "",
    reason: "",
    hodMail: "",
  });
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusFormData, setStatusFormData] = useState({
    mailId: "",
    name: "",
    rollNumber: "",
    complaintDescription: "",
    action: "",
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/escalation");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error.message);
        setError("Failed to fetch complaints. Check your backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleOpenClick = (complaintId) => {
    setShowDetails((prev) => (prev === complaintId ? null : complaintId));
    const selected = complaints.find((complaint) => complaint._id === complaintId);
    setSelectedComplaint(selected);
    setStatusFormData({
      mailId: selected?.mailId || "",
      name: selected?.name || "",
      rollNumber: selected?.rollNumber || "",
      complaintDescription: selected?.complaintDescription || "",
      action: selected?.status || "",
    });
  };

  const handleEscalateClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowForm(true);
  };

  const handleDeleteClick = async (complaintId) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      const response = await fetch(`http://localhost:5001/api/escalation/${complaintId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete complaint.");
      }
      setComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId));
      alert("Complaint deleted successfully!");
    } catch (error) {
      console.error("Error deleting complaint:", error.message);
      alert("Failed to delete complaint. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusInputChange = (e) => {
    const { name, value } = e.target;
    setStatusFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    const updatedComplaint = {
      ...selectedComplaint,
      mailId: statusFormData.mailId,
      name: statusFormData.name,
      rollNumber: statusFormData.rollNumber,
      complaintDescription: statusFormData.complaintDescription,
      status: statusFormData.action,
    };

    try {
      const response = await fetch(`http://localhost:5001/api/escalation/${selectedComplaint._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedComplaint),
      });
      if (!response.ok) {
        throw new Error("Failed to update complaint status.");
      }
      const data = await response.json();
      setComplaints((prev) =>
        prev.map((complaint) => (complaint._id === data._id ? data : complaint))
      );
      setShowDetails(null);
      alert("Complaint status updated successfully!");
    } catch (error) {
      console.error("Error updating complaint status:", error.message);
      alert("Failed to update complaint status. Please try again.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    const escalationData = {
      complaint_id: selectedComplaint.complaint_id,
      escalation_level: selectedComplaint.escalation_level + 1,
      status: "Escalated",
      assigned_to: formData.assignedTo,
      reason: formData.reason,
      hodMail: formData.hodMail,
      notifications: [
        {
          type: "Escalation",
          sent_to: formData.assignedTo,
          sent_at: new Date().toISOString(),
          status: "Pending",
        },
      ],
    };

    try {
      const response = await fetch("http://localhost:5001/api/escalation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(escalationData),
      });
      if (!response.ok) {
        throw new Error("Failed to escalate complaint.");
      }
      const data = await response.json();
      setComplaints((prev) => [...prev, data]);
      setShowForm(false);
      setFormData({ assignedTo: "", reason: "", hodMail: "" });
    } catch (error) {
      console.error("Error escalating complaint:", error.message);
      alert("Failed to escalate complaint. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="escalated-complaints">
      <h2>Escalated Complaints</h2>
      {complaints.map((complaint) => (
        <div key={complaint._id} className="complaint">
          <div>
            <strong>ID: {complaint.complaint_id}</strong>
            <p>
              Escalated to {complaint.assigned_to || "Not assigned yet"} on{" "}
              {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <button onClick={() => handleOpenClick(complaint._id)} className="open-button">
            Open
          </button>

          {showDetails === complaint._id && (
            <div className="status-form-overlay">
              <div className="status-form">
                <h3>Status</h3>
                <form onSubmit={handleStatusSubmit}>
                  <label>Mail ID of the Complained Student:</label>
                  <input
                    type="email"
                    name="mailId"
                    value={statusFormData.mailId}
                    onChange={handleStatusInputChange}
                    required
                  />
                  <label>Name of the Student:</label>
                  <input
                    type="text"
                    name="name"
                    value={statusFormData.name}
                    onChange={handleStatusInputChange}
                    required
                  />
                  <label>Roll Number:</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={statusFormData.rollNumber}
                    onChange={handleStatusInputChange}
                    required
                  />
                  <label>Complaint Description:</label>
                  <textarea
                    name="complaintDescription"
                    value={statusFormData.complaintDescription}
                    onChange={handleStatusInputChange}
                    required
                  />
                  <label>Action:</label>
                  <div className="radio-buttons">
                    <label>
                      <input
                        type="radio"
                        name="action"
                        value="Solved"
                        onChange={handleStatusInputChange}
                      />
                      Solved
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="action"
                        value="Pending"
                        onChange={handleStatusInputChange}
                      />
                      Pending
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="action"
                        value="Not Processed"
                        onChange={handleStatusInputChange}
                      />
                      Not Processed
                    </label>
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="submit-button">
                      Submit
                    </button>
                    <button
                      onClick={() => handleEscalateClick(complaint)}
                      className="escalate-button"
                    >
                      Escalate
                    </button>
                    <button
                      onClick={() => handleDeleteClick(complaint._id)}
                      className="delete-button"
                    >
                      🗑
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDetails(null)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}

      {showForm && (
        <div className="escalation-form-overlay">
          <div className="escalation-form">
            <h3>Escalate To</h3>
            <form onSubmit={handleSubmit}>
              <label>Mail of the HOD:</label>
              <input
                type="email"
                name="hodMail"
                value={formData.hodMail}
                onChange={handleInputChange}
                placeholder="Enter HOD's email"
                required
              />
              <label>Assign To:</label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                placeholder="Enter name"
                required
              />
              <label>Reason:</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Enter reason"
                required
              />
              <div className="form-buttons">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EscalatedComplaints;