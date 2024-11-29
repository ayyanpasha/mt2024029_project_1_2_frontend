import React from 'react';
import EducationDetails from '../Presentation/EducationDetails'
import { Link } from 'react-router-dom';
import './EducationList.css'

export default function EducationList({ education, deleteEducation, setAddEducation }) {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card mt-2">
                    <div className="card-body"></div>
                    <div id="mainContent" className="mainContent">
                        <h2>EDUCATION</h2>
                        <div className="container mt-4">
                            <div className="card-grid">
                                {education.map((item) => (
                                    <EducationDetails 
                                        key={item.educationId}
                                        education={item}
                                        deleteEducation={deleteEducation} 
                                    />
                                ))}
                            </div>
                        </div>
                        <button className='btn btn-success' style={{ margin: '10px' }} onClick={() => setAddEducation(true)}>ADD EDUCATION</button><br />
                        <Link to='/' className='btn btn-danger'>BACK</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
