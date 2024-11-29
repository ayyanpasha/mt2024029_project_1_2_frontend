import React, { useState } from 'react';
import StudentDetailInput from './StudentDetailInput';
import { postEducation } from '../../utils/httpsutil';

export default function EducationForm({ educationData, setEducationData, setAddEducation, load }) {
    const educationLevel = [
        '10th', '12th', 'BTech', 'BE', 'B.Com', 'B.A',
        'M.Tech', 'M.S.', 'M.Com', 'M.A', 'MBA', 'MCA',
        'PhD', 'Diploma', 'ITI', 'Intermediate', 'Certificate'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEducationData({ ...educationData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            educationData.educationName === '0' || 
            educationData.educationName === '' || 
            educationData.institutionName === '' || 
            educationData.percentage === '0'
        ) {
            alert("Fields cannot be empty");
            return;
        }
        await postEducation(educationData);
        setTimeout(() => {
            load();  // Reload education data
        }, 1000);
        setAddEducation(false);  // Close the form
    };

    const selectFields = [
        {
            id: 'educationName',
            name: 'educationName',
            label: 'Education Level(Drop Down)',
            value: educationData.educationName,
            onChange: handleChange,
            options: educationLevel.map(item => ({ value: item, label: item })),
        }
    ];

    const userFields = [
        { id: 'institutionName', name: 'institutionName', label: 'Institution Name', type: 'text', value: educationData.institutionName, required: true },
        { id: 'percentage', name: 'percentage', label: 'Percentage', type: 'number', value: educationData.percentage, required: true }
    ];

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Add Education</h5>
                            <table className="table table-striped" border={3}>
                                <tbody>
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
                                    {userFields.map(({ id, name, label, type, value, required }) => (
                                        <StudentDetailInput
                                            key={id}
                                            type={type}
                                            id={id}
                                            name={name}
                                            value={value}
                                            onChange={handleChange}
                                            label={label}
                                            required={required}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-success' onClick={handleSubmit}>ADD EDUCATION</button><br />
                            <button className='btn btn-danger' style={{ margin: '10px' }} onClick={() => setAddEducation(false)}>BACK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
