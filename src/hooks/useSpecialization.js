import { useState, useEffect } from 'react'
import { fetchSpecialization } from '../utils/httpsutil';
import Specialization from '../model/Specializations';

export default function useSpecialization() {
    const [specialization, setSpecialization] = useState([]);

    const [isLoadingS, setIsLoading] = useState(true);
    const [errorS, setError] = useState(null)

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const fetchedSpecialization = await fetchSpecialization();

                const specializations = fetchedSpecialization.map((item) => new Specialization(item));
                setSpecialization(specializations);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);


    return { specialization, isLoadingS, errorS };
}
