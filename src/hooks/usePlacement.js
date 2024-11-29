import { useState, useEffect } from 'react'
import { fetchPlacement } from '../utils/httpsutil';
import Placements from '../model/Placements';

export default function usePlacement() {
    const [placement, setPlacement] = useState([]);

    const [isLoadingP, setIsLoading] = useState(true);
    const [errorP, setError] = useState(null)

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const fetchedPlacement = await fetchPlacement();

                const placements = fetchedPlacement.map((item) => new Placements(item));
                setPlacement(placements);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);


    return { placement, isLoadingP, errorP };
}
