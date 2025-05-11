import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [vaccinatedStudents, setVaccinatedStudents] = useState(0);
  const [upcomingDrives, setUpcomingDrives] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/stats");
        const data = await response.json();

        setTotalStudents(data.stats.totalNoOfStudents);
        setVaccinatedStudents(data.stats.studentVaccinated);

        const drives = data.vaccinationDriveStats.map((drive) => ({
          date: drive.scheduledAt,
          location: drive.vaccineName,
        }));
        const filteredDrives = drives.filter((drive) => {
          const driveDate = new Date(drive.date);
          const today = new Date();
          const diffInDays = (driveDate - today) / (1000 * 60 * 60 * 24);
          return diffInDays >= 0 && diffInDays <= 30;
        });
        setUpcomingDrives(filteredDrives);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const vaccinationPercentage = (
    (vaccinatedStudents / totalStudents) *
    100
  ).toFixed(2);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vaccination Stats</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Students</h5>
              <p className="card-text display-4">{totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Vaccinated Students</h5>
              <p className="card-text display-4">{vaccinatedStudents}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Vaccination Percentage</h5>
              <p className="card-text display-4">{vaccinationPercentage}%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 mt-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Upcoming Vaccination Drives</h5>
            {upcomingDrives.length > 0 ? (
              <ul className="list-group">
                {upcomingDrives.map((drive, index) => (
                  <li key={index} className="list-group-item">
                    {drive.date} - {drive.location}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming drives within the next 30 days.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
