import {useState} from 'react'
import {login} from '../utils/httpsutil';

export default function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    async function loginUser(username, password) {
        setIsLoading(true);
        setError(null);
        try {
            await login(username, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    

    return {isLoading, error, loginUser };
}
