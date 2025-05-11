import { useState, useEffect } from "react";

function Reports() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKey, setFilterKey] = useState("name");

  const downloadCSV = () => {
    const headers = ["Id", "Name", "Age", "Grade", "Vaccination Status"];
    const rows = students.map((student) => {
      const vaccinationStatus = Object.entries(student.vaccinationStatus)
        .map(
          ([vaccine, status]) => `${vaccine}: ${status ? "Taken" : "Not Taken"}`
        )
        .join("; ");
      return [
        student._id,
        student.name,
        student.age,
        student.grade,
        vaccinationStatus,
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "students.csv";
    link.click();
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const queryParam = searchTerm
          ? `?${filterKey}=${encodeURIComponent(searchTerm)}`
          : "";
        const response = await fetch(
          `http://localhost:3000/api/v1/students${queryParam}`
        );
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
      <h3>Filters</h3>

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
          <div className="col-md-1">
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
          <div className="col-md-2 text-end">
            <button className="btn btn-primary" onClick={downloadCSV}>
              Download CSV
            </button>
          </div>
        </div>
      </div>

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
                  <ul>
                    {Object.entries(student.vaccinationStatus).map(
                      ([vaccine, status]) => (
                        <li key={vaccine}>
                          {vaccine}: {status ? "Taken" : "Not Taken"}
                        </li>
                      )
                    )}
                  </ul>
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

export default Reports;
