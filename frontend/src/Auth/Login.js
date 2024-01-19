import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../Signup.module.css";
import { getAll, getUser } from "../Config/ApiStore";
import Swal from "sweetalert2";

function Login() {
  const [loginData, setLoginData] = useState();
  const [flag, setFlag] = useState(false);
  const [state, setstate] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch({type:"cartLen"})
    if (localStorage.getItem("isLogged") === "true") {
      window.location.replace("/dashboard");
    } else {
      localStorage.setItem("isLogged", false);
    }

    getAll().then((res) => {
      setstate(res.data);
      console.log("res.data" , res.data);
    });
  }, []);
  const handleLoginData = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
    console.log(loginData);
  };
  const submitLogin = (e) => {
    e.preventDefault();

    getUser({ email: loginData.email, password: loginData.password }).then(
      (res) => {
        console.log("ressssss" ,res)
        if (res.data.err == 0) {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            timer: 2000,
          });
          localStorage.setItem("isLogged", true);
          localStorage.setItem("_token", res.data.token);
          navigate("/dashboard");
        } else if (res.data.err == 1) {
          console.log("error");
          Swal.fire({
            icon: "success",
            text: res.data.message,
            timer: 2000,
          });
        }
      }
    );
  };


  return (
    <div>
     <Navbar bg="success" expand="lg">
        <Container>
          <Nav.Link className={styles.heading} style={{ color: "white" }} to="/">
            <span
              style={{ color: "pink", fontWeight: "bold", fontFamily: "italic" }}
            >
              CV
            </span>
            Generator
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#home"
                className={styles.start}
                as={NavLink}
                to="/"
              >
                <Button variant="outline-white">
                  <i class="fas fa-arrow-left"></i> Back To Home
                </Button>{" "}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="Form my-2 mx-2">
        <Container>
          <Row className="d-flex justify-content-center">
            <Col className="col-lg-6 px-5 pt-5 pb-5 border border-danger-subtle Design">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx9bV7JhT1pYwSXwaMgiSBYaj8hNWUsUli_A&usqp=CAU"
                class="img-fluid rounded-circle "
                width="80px"
                height="80px"
                alt=""
              />
              <h4>Login</h4>

              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleLoginData}
                    required
                  />
                  {/* {errors.email.length>0 &&
                        <span style={{color:"red"}}>{errors.email}</span>} */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicpassword">
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleLoginData}
                    required
                  />
                  {/* {errors.mobile.length>0 &&
                    <span style={{color:"red"}}>{errors.mobile}</span>} */}
                </Form.Group>

                <Button
                  variant="primary"
                  className="m-2"
                  onClick={submitLogin}
                  type="submit"
                >
                  Submit
                </Button>
                <br />

                <Link to="/signup">New User? Signup to continue.</Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
