import { useState, useEffect } from 'react'
import { fetchEducation } from '../utils/httpsutil';
import Domain from '../model/Domains';

export default function useEducation() {
    const [education, setEducation] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const fetchedEducation = await fetchEducation();

                setEducation(fetchedEducation);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);


    return { education, setEducation, isLoading, error };
}
