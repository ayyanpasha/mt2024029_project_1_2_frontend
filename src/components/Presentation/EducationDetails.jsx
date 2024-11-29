import React from 'react';
import './EducationDetails.css';

export default function EducationDetails(props) {
    const handleDelete = (educationId) => {
        const confirmed = window.confirm(`Are you sure you want to delete (${props.education.institutionName} ${props.education.educationName}) education entry?`);
        if (confirmed) {
            // Proceed with deletion if confirmed
            props.deleteEducation(educationId);
        }
    };

    return (
        <div className="education-card">
            <div className="education-card-header">
                <h5 className="education-title">{props.education.educationName}</h5>
            </div>
            <div className="education-card-body">
                <p className="education-institute">
                    <strong>Institute Name:</strong> {props.education.institutionName}
                </p>
                <p className="education-percentage">
                    <strong>Percentage:</strong> {props.education.percentage}%
                </p>
            </div>
            <div className="education-card-footer">
                <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(props.education.educationId)}
                >
                    <i className="bi bi-trash"></i>Delete
                </button>
            </div>
        </div>
    );
}
