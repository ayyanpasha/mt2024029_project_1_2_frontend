import React, { useState } from 'react'
import './Education.css'
import EducationDetails from '../components/Presentation/EducationDetails'
import useEducation from '../hooks/useEducation'
import { deleteEducationWithId, postEducation } from '../utils/httpsutil';
import StudentDetailInput from '../components/Presentation/StudentDetailInput';

export default function Education() {
    const {education, setEducation} = useEducation();

    const [addEducation, setAddEducation] = useState(false);

    const [educationData, setEducationData] = useState({
        educationName: '',
        institutionName: '',
        percentage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEducationData({
            ...educationData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        postEducation(educationData);
    };

    const deleteEducation = async (educationId) => {
        await deleteEducationWithId(educationId);
        setEducation(education.filter((id) => id.educationId != educationId));
    }

    const userFields = [
        { id: 'educationName', name: 'educationName', label: 'Education Name', type: 'text', getter: educationData.educationName, required: true },
        { id: 'institutionName', name: 'institutionName', label: 'Institution Name', type: 'text', getter: educationData.institutionName, required: true },
        { id: 'percentage', name: 'percentage', label: 'Percentage', type: 'text', getter: educationData.percentage, required: true }
    ];

    if(addEducation){
        return (
            <div id="mainContent" className="mainContent">
                <div className="container mt-4">
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
                                    <button className='btn btn-success' onClick={handleSubmit}>ADD EDUCATION</button><br/>
                <button className='btn btn-success' onClick={() => setAddEducation((item) => !item)}>SEE EDUCATION</button>
                </div>
            </div>
        );
    }

    return (
        <div id="mainContent" className="mainContent">
            EDUCATION
            <div className="container mt-4">
                <div className="card-grid">
                    {
                        education.map((item) => <EducationDetails key={item.educationId}
                                                        education={item}
                                                        deleteEducation={deleteEducation}/>)
                    }
                </div>
              </div>
              <button className='btn btn-success' onClick={() => setAddEducation((item) => !item)}>ADD EDUCATION</button>
        </div>
    )
}
