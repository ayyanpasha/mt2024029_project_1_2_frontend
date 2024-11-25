import {useState,useEffect} from 'react'
import { fetchUsers } from '../utils/httpsutil';
import Students from '../model/Students';

export default function useStudentsDetails() {
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
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const fetchedUser = await fetchUsers();
                
                const student = new Students(fetchedUser);
                setUsers(student);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);
    

    return { users,setUsers, isLoading, error };
}
