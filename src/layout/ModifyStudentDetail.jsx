import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Students from '../model/Students';
import useDomain from '../hooks/useDomain';
import useSpecialization from '../hooks/useSpecialization';
import StudentDetailInput from '../components/Presentation/StudentDetailInput';
import './StudentDetail.css';
import axios from 'axios';
import usePlacement from '../hooks/usePlacement';

export default function ModifyStudentDetails() {
    const history = useNavigate();
    const [users, setUsers] = useState(new Students(
        {
            studentId: '',
            rollNumber: '',
            firstName: '',
            lastName: '',
            email: '',
            photographPath: '',
            cgpa: '',
            totalCredits: '',
            graduationYear: '',
            domain: '',
            specialization: '',
            placement: ''
        }
    ));
    const {studentId} = useParams();
    const { domain } = useDomain();
    const { specialization } = useSpecialization();
    const {placement} = usePlacement();
    const [imageUrl, setImageUrl] = useState('');

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValueS, setSelectedValueS] = useState('');
    const [selectedValueP, setSelectedValueP] = useState('');
    

    useEffect(() => {
        (async() => {
            try {
                const response = await axios.get(`http://localhost:8080/admin/student/${studentId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
                        'Content-Type': 'application/json',
                    },
                });

                const student = new Students(response.data);
                setUsers(student);
            } catch (error) {
                console.error('Error fetching the image:', error);
                // Handle error (e.g., fallback to default image)
                setImageUrl('/path/to/default-image.jpg');
            }
        })();
    },[studentId])
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
            domainId: selectedValue === '0' ? '' : selectedValue,
            specializationId: selectedValueS === '0' ? '' : selectedValueS,
            placementId: selectedValueP === '0'? '': selectedValueP,
        };

        try {
            await axios.post(`http://localhost:8080/admin/student/${studentId}`, updatedStudent, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
                    'Content-Type': 'application/json',
                },
                
            });
            history('/admin');
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

    const handleChangeSelect = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleChangeSelectS = (event) => {
        setSelectedValueS(event.target.value);
    };
    const handleChangeSelectP = (event) => {
        setSelectedValueP(event.target.value);
    };

    const userFields = [
        { id: 'rollNumber', name: 'rollNumber', label: 'Roll Number', type: 'text', getter: users.getRollNumber(), required: true },
        { id: 'firstName', name: 'firstName', label: 'First Name', type: 'text', getter: users.getFirstName(), required: true },
        { id: 'lastName', name: 'lastName', label: 'Last Name', type: 'text', getter: users.getLastName(), required: true },
        { id: 'email', name: 'email', label: 'Email', type: 'email', getter: users.getEmail(), required: true , readOnly: true},
        { id: 'cgpa', name: 'cgpa', label: 'CGPA', type: 'number', getter: users.getCgpa(), required: true},
        { id: 'totalCredits', name: 'totalCredits', label: 'Total Credits', type: 'number', getter: users.getTotalCredits(), required: true},
        { id: 'graduationYear', name: 'graduationYear', label: 'Graduation Year', type: 'number', getter: users.getGraduationYear(), required: true},
        { id: 'domainId', name: 'domainId', label: 'Domain', type: 'text', getter: users.getDomain().program, required: true , readOnly: true},
        { id: 'specializationId', name: 'specializationId', label: 'Specialization', type: 'text', getter: users.getSpecialization().name, required: true , readOnly:true},
        { id: 'placementId', name: 'placementId', label: 'Placement ID', type: 'text', getter: users.getPlacement().organization, required: false, readOnly: true }
    ];

    const selectFields = [
        {
            id: 'domainIdSelect',
            name: 'domainIdSelect',
            label: 'Change Domain(Drop Down)',
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
            label: 'Change Specialization(Drop Down)',
            value: selectedValueS,
            onChange: handleChangeSelectS,
            options: specialization.map(item => ({
                value: item.getSpecializationId(),
                label: item.getName(),
            })),
        },
        {
            id: 'placementIdSelect',
            name: 'placementIdSelect',
            label: 'Change Placement(Drop Down)',
            value: selectedValueP,
            onChange: handleChangeSelectP,
            options: placement.map(item => ({
                value: item.getId(),
                label: item.getOrganization(),
            })),
        },
    ];

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="heading">
                                    <h3 className="card-title">Modify Student Details</h3>
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
                                    >Modify Details
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
