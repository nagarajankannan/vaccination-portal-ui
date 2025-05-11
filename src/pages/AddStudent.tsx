import { useState } from "react";
import UploadStudents from "./UploadStudents";

function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Student registered successfully!");
        setFormData({ name: "", age: "", grade: "" });
      } else {
        console.error("Failed to register student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-5">
      <h3>Add a Student</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="grade" className="form-label">
            Grade
          </label>
          <select
            className="form-select"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          >
            <option value="">Select Grade</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                Grade {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Register Student
        </button>
      </form>

      <div className="mt-5">
        <UploadStudents />
      </div>
    </div>
  );
}

export default AddStudent;
