import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import AddStudent from "./pages/AddStudent";
import ViewStudents from "./pages/ViewStudents";
import StudentManagement from "./pages/StudentManagement";
import Dashboard from "./pages/Dashboard";
import VaccinationManagement from "./pages/VaccinationManagement";
import Reports from "./pages/Reports";
import NavigationHeader from "./components/NavigationHeader";
import CreateVaccineDrive from "./pages/CreateVaccineDrive";
import ManageVaccines from "./pages/ManageVaccines";
import Login from "./components/Login";

function ProtectedRoute({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: JSX.Element;
}) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <NavigationHeader setIsAuthenticated={setIsAuthenticated} />
      </ProtectedRoute>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-management/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <StudentManagement />
            </ProtectedRoute>
          }
        >
          <Route path="add" element={<AddStudent />} />
          <Route path="view" element={<ViewStudents />} />
        </Route>
        <Route
          path="/vaccine-management/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <VaccinationManagement />
            </ProtectedRoute>
          }
        >
          <Route path="create" element={<CreateVaccineDrive />} />
          <Route path="manage" element={<ManageVaccines />} />
        </Route>
        <Route
          path="/reports"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
