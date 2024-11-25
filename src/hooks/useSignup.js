import {useState} from 'react'
import {signup} from '../utils/httpsutil';
import { useNavigate } from 'react-router-dom';

export default function useSignup() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useNavigate();
    
    async function signinUser(username, password,email) {
        setIsLoading(true);
        setError(null);
        try {
            await signup(username, password,email);
            history("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    

    return {isLoading, error, signinUser };
}
