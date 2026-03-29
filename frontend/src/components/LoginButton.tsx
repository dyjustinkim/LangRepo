import {useAuth0} from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';

const LoginButton: React.FC = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return (
        <Button 
        style={{ fontSize: '1.2rem', width: '200px', height: '50px' }}
        onClick={() => loginWithRedirect({ authorizationParams: {prompt: "login"}})}
        >
            Log In / Sign Up
        </Button>
        
    )
}

export default LoginButton