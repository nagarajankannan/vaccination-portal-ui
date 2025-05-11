import { useState } from "react";

function VaccinationStatus({ studentId, vaccinationStatus }) {
  const [isEditable, setIsEditable] = useState(false);
  const [status, setStatus] = useState(vaccinationStatus);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleStatusChange = (vaccine, value) => {
    setStatus({ ...status, [vaccine]: value === "Taken" });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/students/${studentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(status),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update vaccination status");
      }

      console.log(`Status updated successfully for student ${studentId}`);
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating vaccination status:", error);
    }
  };

  return (
    <div>
      <div>
        {Object.keys(status).map((vaccine) => (
          <div key={vaccine} className="d-flex align-items-center mb-2">
            <span className="me-2">{vaccine}:</span>
            {isEditable ? (
              <select
                className="form-select"
                value={status[vaccine] ? "Taken" : "Not Taken"}
                onChange={(e) => handleStatusChange(vaccine, e.target.value)}
              >
                <option value="Taken">Taken</option>
                <option value="Not Taken">Not Taken</option>
              </select>
            ) : (
              <span>{status[vaccine] ? "Taken" : "Not Taken"}</span>
            )}
          </div>
        ))}
      </div>
      <button
        className="btn btn-sm btn-primary mt-2"
        onClick={isEditable ? handleSave : handleEditClick}
      >
        {isEditable ? "Save" : "Edit"}
      </button>
    </div>
  );
}

export default VaccinationStatus;
