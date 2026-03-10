import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';

type MyNavBarProps = {
  username: string;
};

function MyNavBar({username}: MyNavBarProps) {
  const {logout, isAuthenticated} = useAuth0();
  return (
    <>
      <br />
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>LangRepo</Navbar.Brand>
          <Nav className="me-auto">
            <Navbar.Text>Welcome, {username}! </Navbar.Text>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={`/profile`}>Home</Nav.Link>
            <Nav.Link as={Link} to={`/profile/account`}>Account</Nav.Link>
            <Nav.Link onClick={() => logout()}>Log Out</Nav.Link>
          </Nav>
          
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavBar;