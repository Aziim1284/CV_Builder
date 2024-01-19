import React from 'react';
import {Nav,Navbar,Offcanvas,Container,Form,FormControl,Button,NavDropdown} from 'react-bootstrap'
// import styles from './Navbar.module.css'
import {Link,useNavigate} from 'react-router-dom'
function NavigationBar() {
    const navigate=useNavigate()
    const logout=(e)=>{
        e.preventDefault();
        localStorage.clear();
        alert('You have Successfully Logout from this device.')
        navigate('/login',{replace:true})
    }
  return (
  <>
<Navbar bg="success" expand="lg">
  <Container fluid>
  <Nav.Link  style={{color:'blue'}} to="/" ><span style={{color:'red',fontWeight:'bold',fontFamily:'italic'}}>CV</span>Generator</Nav.Link>
  
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0 "
        style={{ maxHeight: '150px' }}
        navbarScroll
      >
        <Nav.Link ><Link  to="/">Home</Link></Nav.Link>
        <Nav.Link ><Link  to="/dashboard">Dashboard</Link></Nav.Link>
        <Nav.Link ><Link  to="/profile">Profile</Link></Nav.Link>
        <Nav.Link  onClick={logout} className={styles.heading1}>Logout</Nav.Link>
      </Nav>
      
    </Navbar.Collapse>
  </Container>
</Navbar>
  </>
  );
}

export default NavigationBar;
