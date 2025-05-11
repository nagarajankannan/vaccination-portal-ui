import { Link, Outlet } from "react-router-dom";

function VaccinationManagement() {
  return (
    <div className="container mt-4">
      <nav className="mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to="/vaccine-management/create">
              Create
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vaccine-management/manage">
              Manage
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default VaccinationManagement;
