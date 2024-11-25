import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { modifyStudentDetails } from '../utils/httpsutil';
import Students from '../model/Students'; // Import the Students class
import useStudentsDetails from '../hooks/useStudentsDetails';
import useDomain from '../hooks/useDomain';
import useSpecialization from '../hooks/useSpecialization';
import StudentDetailInput from '../components/Presentation/StudentDetailInput'; // Import the new input component

export default function StudentDetail() {
    const history = useNavigate();
    const { users, setUsers, isLoading, error } = useStudentsDetails();
    const [selectedValue, setSelectedValue] = useState('');
    const { domain } = useDomain();
    const [selectedValueS, setSelectedValueS] = useState('');
    const { specialization } = useSpecialization();

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedStudent = {
            studentId: users.getStudentId(),
            rollNumber: users.getRollNumber(),
            firstName: users.getFirstName(),
            lastName: users.getLastName(),
            email: users.getEmail(),
            photographPath: users.getPhotographPath(),
            cgpa: users.getCgpa(),
            totalCredits: users.getTotalCredits(),
            graduationYear: users.getGraduationYear(),
            domainId: selectedValue,
            specializationId: selectedValueS,
            placementId: users.getPlacementId().id,
        };

        try {
            await modifyStudentDetails(updatedStudent);
            history('/login');
        } catch (err) {
            console.error('Error updating student details:', err);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUsers(new Students({
            ...users,
            [name]: value
        }));
    };

    const handleChangeSelect = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleChangeSelectS = (event) => {
        setSelectedValueS(event.target.value);
    };

    // Render form only when user data is loaded
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Modify Student Details</h5>
                            <form onSubmit={handleSubmit}>
                                <StudentDetailInput
                                    type="text"
                                    id="rollNumber"
                                    name="rollNumber"
                                    value={users.getRollNumber()}
                                    onChange={handleChange}
                                    label="Roll Number"
                                    required
                                />
                                
                                <StudentDetailInput
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={users.getFirstName()}
                                    onChange={handleChange}
                                    label="First Name"
                                    required
                                />
                                
                                <StudentDetailInput
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={users.getLastName()}
                                    onChange={handleChange}
                                    label="Last Name"
                                    required
                                />
                                
                                <StudentDetailInput
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={users.getEmail()}
                                    onChange={handleChange}
                                    label="Email"
                                    required
                                />
                                
                                <StudentDetailInput
                                    type="text"
                                    id="photographPath"
                                    name="photographPath"
                                    value={users.getPhotographPath()}
                                    onChange={handleChange}
                                    label="Photograph Path"
                                />
                                
                                <StudentDetailInput
                                    type="number"
                                    id="cgpa"
                                    name="cgpa"
                                    value={users.getCgpa()}
                                    onChange={handleChange}
                                    label="CGPA"
                                    required
                                />
                                
                                <StudentDetailInput
                                    type="number"
                                    id="totalCredits"
                                    name="totalCredits"
                                    value={users.getTotalCredits()}
                                    onChange={handleChange}
                                    label="Total Credits"
                                    required
                                />
                                
                                <StudentDetailInput
                                    type="text"
                                    id="graduationYear"
                                    name="graduationYear"
                                    value={users.getGraduationYear()}
                                    onChange={handleChange}
                                    label="Graduation Year"
                                    required
                                />
                                
                                <StudentDetailInput
                                    type="text"
                                    id="domainId"
                                    name="domainId"
                                    value={users.getDomainId().program}
                                    onChange={handleChange}
                                    label="Domain"
                                    required
                                />

                                {/* Domain Select */}
                                <StudentDetailInput
                                    type="select"
                                    id="domainIdSelect"
                                    name="domainIdSelect"
                                    value={selectedValue}
                                    onChange={handleChangeSelect}
                                    label="Change Domain"
                                    options={domain.map(item => ({
                                        value: item.getDomainId(),
                                        label: item.getProgram()
                                    }))}
                                />

                                <StudentDetailInput
                                    type="text"
                                    id="specializationId"
                                    name="specializationId"
                                    value={users.getSpecializationId().name}
                                    onChange={handleChange}
                                    label="Specialization"
                                    required
                                />

                                {/* Specialization Select */}
                                <StudentDetailInput
                                    type="select"
                                    id="specializationIdSelect"
                                    name="specializationIdSelect"
                                    value={selectedValueS}
                                    onChange={handleChangeSelectS}
                                    label="Change Specialization"
                                    options={specialization.map(item => ({
                                        value: item.getSpecializationId(),
                                        label: item.getName()
                                    }))}
                                />

                                <StudentDetailInput
                                    type="text"
                                    id="placementId"
                                    name="placementId"
                                    value={users.getPlacementId().organization}
                                    onChange={handleChange}
                                    label="Placement ID"
                                    readOnly
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </form>
                            <Link to="/changePassword">Change Password</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
