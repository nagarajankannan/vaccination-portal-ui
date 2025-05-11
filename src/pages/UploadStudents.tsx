import { useState } from "react";

function UploadStudents() {
  const [csvMessage, setCsvMessage] = useState("");

  const handleCsvUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/students/bulk",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          setCsvMessage("CSV uploaded and students registered successfully!");
        } else {
          console.error("Failed to upload CSV");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <h4>Upload Students via CSV</h4>
      {csvMessage && (
        <div className="alert alert-success" role="alert">
          {csvMessage}
        </div>
      )}
      <input
        type="file"
        className="form-control"
        accept=".csv"
        onChange={handleCsvUpload}
      />
    </div>
  );
}

export default UploadStudents;
