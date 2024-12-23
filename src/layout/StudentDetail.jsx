import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { modifyStudentDetails } from '../utils/httpsutil';
import Students from '../model/Students';
import useStudentsDetails from '../hooks/useStudentsDetails';
// import useDomain from '../hooks/useDomain';
// import useSpecialization from '../hooks/useSpecialization';
import StudentDetailInput from '../components/Presentation/StudentDetailInput';
// import StudentDetailFile from '../components/Presentation/StudentDetailFile';
import './StudentDetail.css';
import axios from 'axios';

export default function StudentDetail() {
    const history = useNavigate();
    const { users, setUsers, isLoading, error } = useStudentsDetails();
    // const { domain } = useDomain();
    // const { specialization } = useSpecialization();
    const [imageUrl, setImageUrl] = useState('');

    // const [selectedValue, setSelectedValue] = useState('');
    // const [selectedValueS, setSelectedValueS] = useState('');
    // const [fileName, setFileName] = useState('');

    useEffect(() => {
        // Function to fetch the image
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/upload/images/${users.getPhotographPath()}`, {
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

        // Only fetch image if photographPath exists
        if (users.getPhotographPath()) {
            fetchImage();
        } else {
            setImageUrl('/path/to/default-image.jpg'); // Default image if no photographPath
        }
    }, [users]);

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
            domainId: users.getDomain(),
            specializationId: users.getSpecialization(),
            placementId: users.getPlacement(),
        };

        try {
            await modifyStudentDetails(updatedStudent);
            history('/login');
        } catch (err) {
            console.error('Error updating student details:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsers(new Students({
            ...users,
            [name]: value
        }));
    };

    // const handleChangeSelect = (event) => {
    //     setSelectedValue(event.target.value);
    // };

    // const handleChangeSelectS = (event) => {
    //     setSelectedValueS(event.target.value);
    // };

    const logout = () => {
        localStorage.removeItem('Authorization');
        history('/login');
    };

    const userFields = [
        { id: 'rollNumber', name: 'rollNumber', label: 'Roll Number', type: 'text', getter: users.getRollNumber(), required: true , readOnly: true},
        { id: 'firstName', name: 'firstName', label: 'First Name', type: 'text', getter: users.getFirstName(), required: true , readOnly: true},
        { id: 'lastName', name: 'lastName', label: 'Last Name', type: 'text', getter: users.getLastName(), required: true , readOnly: true},
        { id: 'email', name: 'email', label: 'Email', type: 'email', getter: users.getEmail(), required: true },
        { id: 'photographPath', name: 'photographPath', label: 'Photograph Path', type: 'text', getter: users.getPhotographPath(), required: false, readOnly: true },
        { id: 'cgpa', name: 'cgpa', label: 'CGPA', type: 'number', getter: users.getCgpa(), required: true , readOnly: true},
        { id: 'totalCredits', name: 'totalCredits', label: 'Total Credits', type: 'number', getter: users.getTotalCredits(), required: true , readOnly: true},
        { id: 'graduationYear', name: 'graduationYear', label: 'Graduation Year', type: 'number', getter: users.getGraduationYear(), required: true , readOnly: true},
        { id: 'domainId', name: 'domainId', label: 'Domain', type: 'text', getter: users.getDomain().program, required: true , readOnly: true},
        { id: 'specializationId', name: 'specializationId', label: 'Specialization', type: 'text', getter: users.getSpecialization().name, required: true , readOnly:true},
        { id: 'placementId', name: 'placementId', label: 'Placement ID', type: 'text', getter: users.getPlacement().organization, required: false, readOnly: true }
    ];

    // const selectFields = [
    //     {
    //         id: 'domainIdSelect',
    //         name: 'domainIdSelect',
    //         label: 'Change Domain(Drop Down)',
    //         value: selectedValue,
    //         onChange: handleChangeSelect,
    //         options: domain.map(item => ({
    //             value: item.getDomainId(),
    //             label: item.getProgram(),
    //         })),
    //     },
    //     {
    //         id: 'specializationIdSelect',
    //         name: 'specializationIdSelect',
    //         label: 'Change Specialization(Drop Down)',
    //         value: selectedValueS,
    //         onChange: handleChangeSelectS,
    //         options: specialization.map(item => ({
    //             value: item.getSpecializationId(),
    //             label: item.getName(),
    //         })),
    //     },
    // ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        history('/login');
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="heading">
                                    <h3 className="card-title">Modify Student Details</h3>
                                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                                </div>

                                {/* Display Profile Image */}
                                <div className="text-center mb-4">
                                    <img
                                        src={imageUrl}
                                        alt="Profile"
                                        className="img-thumbnail"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <table className="table table-striped" border={3}>
                                        <tbody>
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
                                            {/* {selectFields.map(({ id, name, label, value, onChange, options }) => (
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
                                            ))} */}
                                            {/* <StudentDetailFile
                                                label="Select Photo"
                                                setFileName={setFileName}
                                                fileName={fileName}
                                            /> */}
                                        </tbody>
                                    </table>
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-block"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </form>
                                <Link to="/education" className="btn btn-primary btn-block mt-1 mb-1">
                                    Education Details
                                </Link>
                                <br />
                                <Link to="/changeImage">Change Image</Link><br/>
                                <Link to="/changePassword">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
