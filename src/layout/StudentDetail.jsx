import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { modifyStudentDetails } from '../utils/httpsutil';
import Students from '../model/Students';
import useStudentsDetails from '../hooks/useStudentsDetails';
import useDomain from '../hooks/useDomain';
import useSpecialization from '../hooks/useSpecialization';
import StudentDetailInput from '../components/Presentation/StudentDetailInput';

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
            placementId: users.getPlacement().id,
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

    const userFields = [
        { id: 'rollNumber', name: 'rollNumber', label: 'Roll Number', type: 'text', getter: users.getRollNumber(), required: true },
        { id: 'firstName', name: 'firstName', label: 'First Name', type: 'text', getter: users.getFirstName(), required: true },
        { id: 'lastName', name: 'lastName', label: 'Last Name', type: 'text', getter: users.getLastName(), required: true },
        { id: 'email', name: 'email', label: 'Email', type: 'email', getter: users.getEmail(), required: true },
        { id: 'photographPath', name: 'photographPath', label: 'Photograph Path', type: 'text', getter: users.getPhotographPath(), required: false },
        { id: 'cgpa', name: 'cgpa', label: 'CGPA', type: 'number', getter: users.getCgpa(), required: true },
        { id: 'totalCredits', name: 'totalCredits', label: 'Total Credits', type: 'number', getter: users.getTotalCredits(), required: true },
        { id: 'graduationYear', name: 'graduationYear', label: 'Graduation Year', type: 'number', getter: users.getGraduationYear(), required: true },
        { id: 'domainId', name: 'domainId', label: 'Domain', type: 'text', getter: users.getDomain().program, required: true },
        { id: 'specializationId', name: 'specializationId', label: 'Specialization', type: 'text', getter: users.getSpecialization().name, required: true },
        { id: 'placementId', name: 'placementId', label: 'Placement ID', type: 'text', getter: users.getPlacement().organization, required: false, readOnly: true },
    ];

    const selectFields = [
        {
            id: 'domainIdSelect',
            name: 'domainIdSelect',
            label: 'Change Domain',
            value: selectedValue,
            onChange: handleChangeSelect,
            options: domain.map(item => ({
                value: item.getDomainId(),
                label: item.getProgram(),
            })),
        },
        {
            id: 'specializationIdSelect',
            name: 'specializationIdSelect',
            label: 'Change Specialization',
            value: selectedValueS,
            onChange: handleChangeSelectS,
            options: specialization.map(item => ({
                value: item.getSpecializationId(),
                label: item.getName(),
            })),
        },
    ];

    const logout = () => {
        localStorage.removeItem('Authorization');
        history('/login');
    }


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        history('/login');
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <>
        <button className='btn btn-danger' onClick={logout}>Logout</button>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Modify Student Details</h5>
                                <form onSubmit={handleSubmit}>
                                    {userFields.map(({ id, name, label, type, getter, required, readOnly = false }) => (
                                        <StudentDetailInput
                                            key={id}
                                            type={type}
                                            id={id}
                                            name={name}
                                            value={getter}
                                            onChange={handleChange}
                                            label={label}
                                            required={required}
                                            readOnly={readOnly}
                                        />
                                    ))}

                                    {/* Render select fields */}
                                    {selectFields.map(({ id, name, label, value, onChange, options }) => (
                                        <StudentDetailInput
                                            key={id}
                                            type="select"
                                            id={id}
                                            name={name}
                                            value={value}
                                            onChange={onChange}
                                            label={label}
                                            options={options}
                                        />
                                    ))}

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </form>
                                <Link
                                to="/education"
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        Education Details
                                    </Link>
                                    <br/>
                                <Link to="/changePassword">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
