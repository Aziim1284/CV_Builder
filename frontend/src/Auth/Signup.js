import React, { useEffect } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { addUser } from "../Config/ApiStore";
import styles from "./../Signup.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { MAIN_URL } from "../Config/Url";

const bcrypt = require("bcryptjs");
const regForName = RegExp(/^[A-Za-z]{2,10}$/);
const regForUName = RegExp(/^[A-Za-z]{2,12}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
);
function Signup() {
  const navigate = useNavigate();
  const pass = useRef();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    photo: "",
  });
  const [select, setSelect] = useState();
  const [google, setGoogle] = useState("");
  const [flag, setFlag] = useState(false);
  const [googleflag, setgoogleflag] = useState(false);
  const [Errors, SetError] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fname":
        Errors.fname = regForName.test(value)
          ? ""
          : " name should be between 2 to 10 letters";
        break;
      case "lname":
        Errors.lname = regForName.test(value)
          ? ""
          : " last name should be between 2 to 10 letters";
        break;
      case "email":
        Errors.email = regForEmail.test(value) ? "" : "invalid email";
        break;

      case "password":
        Errors.password = regForPass.test(value)
          ? ""
          : "Password must be between 6 to 16 characters and must contain one number and one special character";
        break;
      case "cpassword":
        Errors.cpassword =
          pass.current.value === value ? "" : "Password do not match";
        break;
      default:
        console.log("Unknown");
        break;
    }
    setSelect({ Errors, [name]: value }, () => {
      console.log(Errors);
    });

    setData({ ...data, [name]: value });
    console.log(data);
  };
  //validate errors
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const submit = (e) => {
    e.preventDefault();
    const saltRounds = 10;
    const myPlaintextPassword = data.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(myPlaintextPassword, salt);
    data.password = hashPass;
    data.photo = "profile.jpg";
    console.log(data);
    setFlag(true);
    if (validate(Errors)) {
      addUser(data).then((res) => {
        console.log(res.data);
        if (res.data.err == 1) {
          Swal.fire({
            icon: "error",
            text: res.data.message,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            timer: 2000,
          });
        }
      });
      
    }
  };

  const checkUserExisting = async (userDetail) => {
    // console.log("id_tojken" , userDetail)
    const URL = ` ${MAIN_URL}posts/googleauth`;
    const response = await axios.post(URL, userDetail, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("responsecode", response);
    if (response.status == 200) {
      Swal.fire({
        icon: "success",
        title:"Google User Login Success",
        text: response.statusText,
        timer: 2000,
      });
      localStorage.setItem("isLogged", true);
      localStorage.setItem("_token", response.data.token);
      navigate("/dashboard");
      console.log("responseresponse", response);
    }
  };

  const firebaseConfig = {
    apiKey: "AIzaSyCgXZBSL9QS2vwPtDfff183xyNHd-8Pz2A",
    authDomain: "fblogin-c326f.firebaseapp.com",
    projectId: "fblogin-c326f",
    storageBucket: "fblogin-c326f.appspot.com",
    messagingSenderId: "160719322271",
    appId: "1:160719322271:web:3c2abddc85b6ce638376aa",
    measurementId: "G-5HE5YJG00Z",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const fbprovider = new FacebookAuthProvider();

  const FacebookAuth = () => {
    signInWithPopup(auth, fbprovider).then((fbresult) => {
      console.log("facebookData", fbresult);
    });
  };
  const GoogleAuthenti = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("result", result);
      setGoogle(result);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        googleId: result.user.uid,
        userProfileImageUrl: result.user.photoURL,
      };
      checkUserExisting(userData);
    });
  };

  return (
    <div>
      <Navbar bg="success" expand="lg">
        <Container>
          <Navbar.Brand className={styles.heading} style={{ color: "white" }}>
            <span
              style={{
                color: "pink",
                fontWeight: "bold",
                fontFamily: "italic",
              }}
            >
              CV
            </span>
            Generator
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
      <div className="Form my-2 mx-2 ">
        <Container>
          <Row className="d-flex justify-content-center">
            <Col className="col-lg-6 px-5 pt-3 pb-2 border border-danger-subtle Design">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx9bV7JhT1pYwSXwaMgiSBYaj8hNWUsUli_A&usqp=CAU"
                class="img-fluid rounded-circle "
                width="80px"
                height="80px"
                alt=""
              />
              <h4>Signup</h4>

              <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicfirstName">
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="Enter First Name"
                    onChange={handler}
                    required
                  />
                  {Errors.fname.length > 0 && (
                    <span style={{ color: "red" }}>{Errors.fname}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasiclastName">
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="Enter Last Name"
                    onChange={handler}
                    required
                  />
                  {Errors.lname.length > 0 && (
                    <span style={{ color: "red" }}>{Errors.lname}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handler}
                    required
                  />
                  {Errors.email.length > 0 && (
                    <span style={{ color: "red" }}>{Errors.email}</span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicpassword">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    ref={pass}
                    onChange={handler}
                    required
                  />
                  {Errors.password.length > 0 && (
                    <span style={{ color: "red" }}>{Errors.password}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasiccpassword">
                  <Form.Control
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                    onChange={handler}
                    required
                  />
                  {Errors.cpassword.length > 0 && (
                    <span style={{ color: "red" }}>{Errors.cpassword}</span>
                  )}
                </Form.Group>

                <Button variant="primary" className="m-2" type="submit">
                  Submit
                </Button>
                {flag ? navigate("/login") : null}
                {googleflag ? navigate("/dashboard") : null}
                <Button variant="success" className="m-2" type="reset">
                  Reset
                </Button>
                <br />
                <Button
                  onClick={GoogleAuthenti}
                  variant="success"
                  className="m-2"
                  style={{ width: "350px" }}
                >
                  SingIn with google
                </Button>
                <br />
                <Button
                  onClick={FacebookAuth}
                  variant="primary"
                  className="m-2"
                  style={{ width: "350px" }}
                >
                  SingIn with Facebook
                </Button>
                <br />
                <br />
                <Link to="/login">
                  already have an account? Login to continue
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Signup;
