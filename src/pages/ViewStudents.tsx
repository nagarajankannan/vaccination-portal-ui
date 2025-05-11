import { useState, useEffect } from "react";
import VaccinationStatus from "./VaccinationStatus";

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKey, setFilterKey] = useState("name");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const queryParam = searchTerm ? `?${filterKey}=${encodeURIComponent(searchTerm)}` : "";
        const response = await fetch(`http://localhost:3000/api/v1/students${queryParam}`);
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          console.error("Failed to fetch students");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [searchTerm, filterKey]);

  return (
    <div className="mt-5">
      <h3>View Students</h3>

      {/* Filter Section */}
      <div className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterKey}
              onChange={(e) => setFilterKey(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="grade">Class</option>
              <option value="id">ID</option>
              <option value="vaccinationStatus">Vaccination Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      {students && students.length > 0 ? (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Vaccination Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student._id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
                <td>
                  <VaccinationStatus
                    studentId={student._id}
                    vaccinationStatus={student.vaccinationStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students match the search criteria.</p>
      )}
    </div>
  );
}

export default ViewStudents;
