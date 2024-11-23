import React, {useState,useEffect} from 'react'
import Students from '../model/Students';

export default function useStudentsDetails() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const fetchedUser = await fetchUsers();
                
                fetchedUser = new Students(fetchedUser);
                setUsers(fetchedUser);
                
                console.log("Mapped Data:", fetchedUser); 
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);
    

    return { users, isLoading, error };
}
