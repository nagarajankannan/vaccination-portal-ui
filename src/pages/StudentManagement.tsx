import { Link, Outlet } from "react-router-dom";

function StudentManagement() {
  return (
    <div className="container mt-4">
      <nav className="mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to="/student-management/add">
              Add
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/student-management/view">
              View
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

export default StudentManagement;
