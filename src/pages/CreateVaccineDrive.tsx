import { useState } from "react";

function CreateVaccineDrive() {
  const [formData, setFormData] = useState({
    vaccineName: "",
    scheduledAt: "",
    availableDoses: "",
    applicableGrades: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "applicableGrades") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData({ ...formData, [name]: selectedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/vaccination-drives",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create vaccination drive");
      }

      setSuccessMessage("Vaccination drive created successfully!");
      setFormData({
        vaccineName: "",
        scheduledAt: "",
        availableDoses: "",
        applicableGrades: "",
      });
    } catch (error) {
      alert("Failed to create vaccination drive. Please try again.");
    }
  };

  return (
    <div className="create-vaccine">
      <h3>Create a vaccine drive</h3>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="vaccineName" className="form-label">
            Vaccine Name
          </label>
          <input
            type="text"
            className="form-control"
            id="vaccineName"
            name="vaccineName"
            value={formData.vaccineName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="scheduledAt" className="form-label">
            Scheduled At
          </label>
          <input
            type="date"
            className="form-control"
            id="scheduledAt"
            name="scheduledAt"
            value={formData.scheduledAt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="availableDoses" className="form-label">
            Available Doses
          </label>
          <input
            type="number"
            className="form-control"
            id="availableDoses"
            name="availableDoses"
            value={formData.availableDoses}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="applicableGrades" className="form-label">
            Applicable Grades
          </label>
          <select
            className="form-select"
            id="applicableGrades"
            name="applicableGrades"
            value={formData.applicableGrades}
            onChange={handleChange}
            multiple
            required
          >
            <option value="">Select Grade</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
              <option key={grade} value={grade}>
                Grade {grade}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateVaccineDrive;
