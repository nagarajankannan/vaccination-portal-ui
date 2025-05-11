import { useEffect, useState } from "react";

function ManageVaccines() {
  const [vaccines, setVaccines] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedVaccine, setEditedVaccine] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchVaccines() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/vaccination-drives"
        );
        const data = await response.json();
        setVaccines(data);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    }

    fetchVaccines();
  }, []);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedVaccine({
      ...vaccines[index],
      scheduledAt: vaccines[index].scheduledAt
        ? new Date(vaccines[index].scheduledAt).toISOString().split("T")[0]
        : "",
      applicableGrades: vaccines[index].applicableGrades.join(","),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVaccine({ ...editedVaccine, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const updatedVaccine = {
        ...editedVaccine,
        applicableGrades: editedVaccine.applicableGrades
          .split(",")
          .map((grade) => grade.trim()),
      };

      const response = await fetch(
        `http://localhost:3000/api/v1/vaccination-drives/${updatedVaccine.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVaccine),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        setNotification({
          type: "danger",
          message:
            responseData.message ||
            "Failed to update vaccine. Please try again.",
        });
        console.error("Failed to update vaccine");
        return;
      }

      const updatedVaccines = [...vaccines];
      updatedVaccines[editingIndex] = updatedVaccine;
      setVaccines(updatedVaccines);
      setEditingIndex(null);
      setNotification({
        type: "success",
        message: responseData.message || "Vaccine updated successfully.",
      });
    } catch (error) {
      console.error("Error updating vaccine:", error);
      setNotification({
        type: "danger",
        message:
          "An error occurred while updating the vaccine. Please try again.",
      });
    }
  };

  return (
    <div className="manage-vaccines mt-5">
      <h3>Manage drives</h3>
      {notification && (
        <div className={`alert alert-${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}
      {vaccines && vaccines.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vaccine Name</th>
              <th>Scheduled At</th>
              <th>Available Doses</th>
              <th>Applicable Grades</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((vaccine, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="vaccineName"
                      value={editedVaccine.vaccineName || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    vaccine.vaccineName
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="date"
                      name="scheduledAt"
                      value={editedVaccine.scheduledAt || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    new Date(vaccine.scheduledAt).toLocaleDateString()
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      name="availableDoses"
                      value={editedVaccine.availableDoses || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    vaccine.availableDoses
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="applicableGrades"
                      value={editedVaccine.applicableGrades || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    vaccine.applicableGrades.join(",")
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vaccines available. Please add some.</p>
      )}
    </div>
  );
}

export default ManageVaccines;
