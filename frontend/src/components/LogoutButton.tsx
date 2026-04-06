import {useAuth0} from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';


const LogoutButton: React.FC = () => {
    const {logout} = useAuth0();
    return (

            <Button 
            style={{ fontSize: '1.2rem', width: '200px', height: '50px' }}
            onClick={() => logout()}>
                Log Out
            </Button>
        
    )
}

export default LogoutButton