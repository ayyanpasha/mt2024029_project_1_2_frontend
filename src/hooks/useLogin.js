import {useState} from 'react'
import {login} from '../utils/httpsutil';
import {useNavigate} from 'react-router-dom';

export default function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useNavigate();
    
    async function loginUser(username, password) {
        setIsLoading(true);
        setError(null);
        try {
            await login(username, password);
            history("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    

    return {isLoading, error, loginUser };
}
