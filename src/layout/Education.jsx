import React, { useState } from 'react';
import EducationForm from '../components/Presentation/EducationForm';
import EducationList from '../components/UsersList/EducationList';
import useEducation from '../hooks/useEducation';
import { deleteEducationWithId } from '../utils/httpsutil';

export default function Education() {
    const { education, setEducation, load } = useEducation();
    const [addEducation, setAddEducation] = useState(false);
    const [educationData, setEducationData] = useState({
        educationName: '',
        institutionName: '',
        percentage: ''
    });

    const deleteEducation = async (educationId) => {
        await deleteEducationWithId(educationId);
        setEducation(education.filter((id) => id.educationId !== educationId));
    };

    if (addEducation) {
        return (
            <EducationForm 
                educationData={educationData} 
                setEducationData={setEducationData} 
                setAddEducation={setAddEducation} 
                load={load} 
            />
        );
    }

    return (
        <EducationList 
            education={education} 
            deleteEducation={deleteEducation} 
            setAddEducation={setAddEducation} 
        />
    );
}
