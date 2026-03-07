import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useParams, Link } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';

function MyNavBar() {
  const {username} = useParams();
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
            <Nav.Link as={Link} to={`/${username}`}>Home</Nav.Link>
            <Nav.Link as={Link} to={`/${username}/account`}>Account</Nav.Link>
            <Nav.Link onClick={() => logout()}>Log Out</Nav.Link>
          </Nav>
          
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavBar;