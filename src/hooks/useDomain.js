import { useState, useEffect } from 'react'
import { fetchDomain } from '../utils/httpsutil';
import Domain from '../model/Domains';

export default function useDomain() {
    const [domain, setDomain] = useState([]);

    const [isLoadingD, setIsLoading] = useState(true);
    const [errorD, setError] = useState(null)

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const fetchedDomain = await fetchDomain();

                const domains = fetchedDomain.map((item) => new Domain(item));
                setDomain(domains);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);


    return { domain, isLoadingD, errorD };
}
