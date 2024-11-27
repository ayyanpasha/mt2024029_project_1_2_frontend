import React from 'react'

export default function EducationDetails(props) {
    return (
        <div className="card">
            <div>Education Name: {props.education.educationName}</div>
            <div>Institute Name: {props.education.institutionName}</div>
            <div>Percentage: {props.education.percentage}</div>
            <button className='btn btn-outline-danger' onClick={() => props.deleteEducation(props.education.educationId)}>Delete</button>
        </div>
    )
}
