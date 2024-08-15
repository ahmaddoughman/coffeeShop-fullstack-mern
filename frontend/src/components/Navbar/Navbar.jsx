import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useLocation } from 'react-router-dom';


function NavScrollExample() {

  const [tokenUser, setTokenUser] = useState(localStorage.getItem("tokenUser"));
  const location = useLocation();


  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    setTokenUser(token);
  }, [location]);

  return (
    <Navbar expand="lg"  style={{ backgroundColor: 'rgba(105,105,105,0.3)', width: "100%", position: 'absolute', top: '0', zIndex: '1000' }}>
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" style={{color:"#fff", fontWeight:"700"}}>Coffee Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', paddingLeft: '450px' }}
            navbarScroll
          >
            <Nav.Link as={NavLink} to="/" style={{color:"#fff", fontWeight:"700", fontSize:"20px"}}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/shop" style={{color:"#fff", fontWeight:"700", fontSize:"20px"}}>Shop</Nav.Link>
            <Nav.Link as={NavLink} to="/cart" style={{color:"#fff", fontWeight:"700", fontSize:"20px"}}>Cart</Nav.Link>
          </Nav>

          <Form className="d-flex">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', paddingRight: '50px' }}
            navbarScroll
          >
            {!tokenUser ? (
              <Nav.Link as={NavLink} to="/login" style={{color:"#fff", fontWeight:"700", fontSize:"20px"}}>Login</Nav.Link>
            ) : 
            (
              <Nav.Link as={NavLink} to="/profile" style={{color:"#fff", fontWeight:"700", fontSize:"20px"}}>Profile</Nav.Link>
            )}
           </Nav>

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;