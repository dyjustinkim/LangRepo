import {useAuth0} from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return (
        <button onClick={() => loginWithRedirect({ authorizationParams: {prompt: "login"}})}>
            Sign In
        </button>
        
    )
}

export default LoginButton