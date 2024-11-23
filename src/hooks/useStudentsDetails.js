import React, {useState,useEffect} from 'react'

export default function useStudentsDetails() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const fetchedUsers = await fetchUsers();
                
                const persons = fetchedUsers.map((item) => new Users(item));
                setUsers(persons);
                
                console.log("Mapped Data:", persons); 
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);
    

    // Return all necessary states from the hook
    return { users, isLoading, error };
}
