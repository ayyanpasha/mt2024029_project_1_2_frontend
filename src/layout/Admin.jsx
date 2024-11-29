import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Fetch student data from the API
  useEffect(() => {
    const fetchStudents = async () => {
        const token = localStorage.getItem('Authorization');
      try {
        const response = await axios.get('http://localhost:8080/admin/student',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
        );
        setStudents(response.data); // Set the students state with fetched data
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  const fetchImage = async (photographPath) => {
    try {
        const response = await axios.get(`http://localhost:8080/upload/images/${photographPath}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
            },
            responseType: 'blob', // Important to get the image as a blob
        });

        // Create an object URL for the image blob
        const imageObjectUrl = URL.createObjectURL(response.data);
        setImageUrl(imageObjectUrl);
    } catch (error) {
        console.error('Error fetching the image:', error);
        // Handle error (e.g., fallback to default image)
        setImageUrl('/path/to/default-image.jpg');
    }
};

  // Handle selecting a student
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setShowModal(true); // Show the modal with the selected student details
  };

  // Close modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student List</h2>

      {/* Display the student list in a table */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>CGPA</th>
            <th>Graduation Year</th>
            <th>Action</th>
            <th>View Profile</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.studentId}>
              <td>{student.rollNumber}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.cgpa}</td>
              <td>{student.graduationYear}</td>
              <td>
                <button 
                  className="btn btn-info" 
                  onClick={() => {
                    handleSelectStudent(student);
                    fetchImage(student.photographPath)
                }}
                >
                  View Details
                </button>
              </td>
              <td>
                {/* New View Profile link */}
                <Link
                  to={`/admin/student/${student.studentId}`} 
                  className="btn btn-primary"
                >
                  View Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to display selected student details */}
      {selectedStudent && (
        <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Student Details</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <img
                                        src={imageUrl}
                                        alt="Profile"
                                        className="img-thumbnail"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                <p><strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.lastName}</p>
                <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>CGPA:</strong> {selectedStudent.cgpa}</p>
                <p><strong>Total Credits:</strong> {selectedStudent.totalCredits}</p>
                <p><strong>Graduation Year:</strong> {selectedStudent.graduationYear}</p>
                <p><strong>Domain:</strong> {selectedStudent.domain.program} ({selectedStudent.domain.batch})</p>
                <p><strong>Specialization:</strong> {selectedStudent.specialization.name}</p>
                <p><strong>Placement:</strong> {selectedStudent.placement.organization} ({selectedStudent.placement.profile})</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
