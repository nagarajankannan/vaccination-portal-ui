import { Link } from "react-router-dom";

function NavigationHeader({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vaccine Portal
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/student-management/add">
                Student Management
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vaccine-management/create">
                Vaccine Management
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reports">
                Reports
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-danger"
            style={{ position: "absolute", right: "10px" }}
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavigationHeader;
