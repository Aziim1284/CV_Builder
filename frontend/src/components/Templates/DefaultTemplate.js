import React from "react";
import { Container, Navbar,Nav,Row,Col,Card } from 'react-bootstrap';
import {Paper } from '@mui/material'
// import styles from './Preview.module.css'
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
const DefaultTemplate = ({ref,styles ,state})=>{
    return(
        <div>
        <Paper ref={ref} id='divToPrint' elevation={5} className="mt-5 mb-5"  style={{padding:'40px' }} >
        <nav class="navbar navbar-light bg-light  "  >
                <div class="container-fluid" style={{ height: "300px" }}>
                <img  src="https://flyclipart.com/thumb2/business-group-team-icon-395976.png" alt="image" height="120px" width=" 190px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                                          <div>
                
                <h5 className={styles.name}>Name: {state.user.name}</h5> 
                <h5 className={styles.name}><LocalPostOfficeRoundedIcon/> Email:  {state.user.email}</h5> 
                <p ><LocalPhoneRoundedIcon/> Phone Number: {state.user.phone}</p> 
                <h3><HomeRoundedIcon/> Address:-</h3>
                <p > {state.user.address} {state.user.city} </p>   
                <p > {state.user.state} {state.user.pincode} </p>   
        
         
          </div>
                </div>
            </nav>
            <Container>
            <Row >
                <Col sm={4}   className={styles.row} >
                    <h3 className={styles.heading}>About Me</h3>
                </Col>
                <Col sm={8}  className="mt-5">
                    
                        <h6 className={styles.info}>
                            {state.user.introduction}
                        </h6>
                  
                </Col>
            </Row>
            <hr/>
            <Row  >
                <Col sm={4}  className={styles.row}>
                <h3 className={styles.heading}>Educational Details</h3>
                </Col>
                <Col sm={8}  className="mt-5">
                <table class="table " style={{border:"2px solid grey"}}>
                    <thead>
                        <tr style={{background:'lightgrey'}}>
                            <th scope="col">Sr No</th>
                            <th scope="col">Degree Name</th>
                            <th scope="col">Institute Name</th>
                            <th scope="col">Percentage</th>
                        
                        </tr>
                    </thead>

                    <tbody>
                        {state.user.education.map((ele, index) =>

                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{ele.degree}</td>
                                <td>{ele.institute}</td>
                                <td>{ele.percentage}</td>
                              
                            </tr>
                        )}

                    </tbody>
                </table>
                       
                  
                </Col>
            </Row>
            <hr/>
            <Row  >
                <Col sm={4}  className={styles.row}>
                <h3 className={styles.heading}>Experience Details</h3>
                </Col>
                <Col sm={8}  className="mt-5">
             
                        {state.user.experience.map((ele, index) =>

                          <p className={styles.heading1}>{index+1}. I have Worked with {ele.organization} and the location was {ele.location}.My previous CTC was {ele.ctc} when i was working in previous company. <br/>
                          I have Worked as a {ele.position}in that Company.
                          My Joining Date was {ele.joining} and Leaving Date was {ele.leaving}. 
                          I have worked on {ele.technology}</p>
                        )}

                   
                       
                  
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col sm={4}  className={styles.row}>
                <h3 className={styles.heading}>Project Details</h3>
                </Col>
                <Col sm={8}  className="mt-5">
                <table class="table " style={{border:"2px solid grey"}}>
                    <thead>
                        <tr style={{background:'lightgrey'}}>
                            <th scope="col">Sr No</th>
                            <th scope="col">Title</th>
                            <th scope="col">Team Size</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Technology used</th>
                            <th scope="col">Description</th>
                        
                        </tr>
                    </thead>

                    <tbody>
                        {state.user.project.map((ele, index) =>

                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{ele.title}</td>
                                <td>{ele.teamsize}</td>
                                <td>{ele.duration}</td>
                                <td>{ele.tech}</td>
                                <td>{ele.description}</td>
                              
                            </tr>
                        )}

                    </tbody>
                </table>
                       
                  
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col sm={4}  className={styles.row}>
                    <h3 className={styles.heading}>MY Skills</h3>
                </Col>
                <Col sm={8}  className="mt-5">
                    
                        <h6 className={styles.info}>
                            {state.user.skill}
                        </h6>
                       
                  
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col sm={4}  className={styles.row}>
                    <h3 className={styles.heading}>Social Profile</h3>
                </Col>
                <Col sm={8}  className="mt-5">
                    
                { state.user.profile!== undefined && state.user.profile.map((ele, index) =>
                     
                       <div>
                              <p>Social Account: {ele.profile}</p>
                              <p>Account Name: { ele.proname}</p>
                              <p>Connect with social Account: {ele.link}</p>
                       </div>
                       
                )}
                </Col>
            </Row>
            </Container>
           
        </Paper>
        </div>
    )
}

export default DefaultTemplate