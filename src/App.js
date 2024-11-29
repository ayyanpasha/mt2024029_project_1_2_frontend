import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './layout/Signup';
import Login from './layout/Login';
import ChangePassword from './layout/ChangePassword';
import StudentDetail from './layout/StudentDetail';
import Education from './layout/Education';
import ChangeImage from './layout/ChangeImage';
import AdminLogin from './layout/AdminLogin';
import Admin from './layout/Admin';
import ModifyStudentDetails from './layout/ModifyStudentDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/education" element={<Education />} />
          <Route path="/" element={<StudentDetail />} />
          <Route path="/changeImage" element={<ChangeImage />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/student/:studentId" element={<ModifyStudentDetails />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
