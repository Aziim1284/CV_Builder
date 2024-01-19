import React from 'react';
import {Navbar,Nav,Container,Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import styles from '../../Home.module.css'
function Home() {
  const token = localStorage.getItem("_token")
  return (
    <>
    <Navbar bg="success" expand="lg">
  <Container>
    <Navbar.Brand className={styles.heading} style={{color:'blue'}} ><span style={{color:'red',fontWeight:'bold',fontFamily:'italic'}}>CV</span>Builder</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto" >
        <Nav.Link href="#home" className={styles.start}  as={NavLink} to="/signup" >
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
<div className={styles.pageContainer}>
            <section className={styles.hero}>
                <h1>Craft your professional journey effortlessly with a CV.</h1>
                <div className={styles.paragraph}>
                "Craft your professional narrative with tailored resume templates – the perfect canvas for your journey in Technology, Engineering, Management, or Marketing."
                </div>

               <div> <a href={token=="" && token == undefined ? "/signup" :"/dashboard"}> <Button variant="outline-primary">Get Started</Button></a></div>
                <div className={styles.imgContainer}>
                    <img src="	https://ourmoneymarket.com/wp-content/uploads/2020/05/partner-hero.png" alt="invoicing-app" style={{height:"70vh" ,marginTop:"50px"}}/>
                </div>
            </section>
        </div>
    
        <footer  className={styles.footer}>
    
                <div >
                CVBuilder by Aziim Bhatti
                </div>
             
            </footer>


    </>
  )
}

export default Home;
