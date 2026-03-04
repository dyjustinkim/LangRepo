import DeckList from '../components/Decks'
import {useAuth0} from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';


export default function Home() {
    const {user, isAuthenticated} = useAuth0();

    return (
    
    <>
        <div>
          </div>
          <h1>LangRepo Prototype!!</h1>
          <h1> Welcome, {user?.nickname}</h1>
          <div className="card">
            <DeckList />
        </div>
        <div><LogoutButton /> </div>
    </>
    
    )
}


