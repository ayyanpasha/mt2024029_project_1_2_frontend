import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './layout/Signup';
import Login from './layout/Login';
import ChangePassword from './layout/ChangePassword';
import StudentDetail from './layout/StudentDetail';
import Education from './layout/Education';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/changePassword" element={<ChangePassword />} />
          <Route exact path="/education" element={<Education />} />
          <Route exact path="/" element={<StudentDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
