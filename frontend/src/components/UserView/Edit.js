import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Row,
  Col,
  Form,
  Table,
  Button,
} from "react-bootstrap";
import {
  getCV,
  UpdateBasicDetails,
  UpdateEducation,
  UpdateExperience,
  UpdateProject,
  UpdateSkill,
  UpdateSocialProfile,
} from "../../Config/ApiStore";
import jwt_decode from "jwt-decode";
import styles from "../../Preview.module.css";
import LocalPostOfficeRoundedIcon from "@mui/icons-material/LocalPostOfficeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
const regForName = RegExp(/^[A-Za-z]{2,10}$/);

function Edit() {
  const [data, setData] = useState();
  const [cv, setCV] = useState();
  const [bflag, setBflag] = useState(false);
  const [edudata, setedudata] = useState([]);
  const [expdata, setexpdata] = useState([]);
  const [profileData, setprofiledata] = useState([]);
  const [projectData, setprodata] = useState([]);
  const [value, setValue] = useState(null);

  const [edit, setEditData] = useState();
  const [editexp, seteditexpData] = useState();
  const [eproject, seteproject] = useState();
  const [eprofile, seteprofile] = useState();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [temp, setTemp] = useState(true);
  const instituteref = useRef(null);
  const degreeref = useRef(null);
  const percentageRef = useRef(null);
  const organizationRef = useRef(null);
  const locationRef = useRef(null);
  const CTCRef = useRef(null);
  const positionRef = useRef(null);
  const leavingRef = useRef(null);
  const joiningRef = useRef(null);
  const technologyRef = useRef(null);
  const titleRef = useRef(null);
  const teamsizeRef = useRef(null);
  const DurationRef = useRef(null);
  const TechRef = useRef(null);
  const descRef = useRef(null);
  const profileRef = useRef(null);
  const pronameRef = useRef(null);
  const linkRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const pinRef = useRef(null);
  const CityRef = useRef(null);
  const StateRef = useRef(null);
  const IntroRef = useRef(null);
  const skillRef = useRef(null);
  const skillperRef = useRef(null);
  var formSubmitting = false;

  useEffect(() => {
    if (localStorage.getItem("_token") !== undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode);
      setData(decode);
      getCV().then((res) => {
        const result = res.data;
        console.log(result);
        let token = localStorage.getItem("_token");
        let decode = jwt_decode(token);
        console.log(decode);
        const orderData = result.filter((result) => result.id == decode.id);
        console.log(orderData);
        setCV(orderData);
      });
    }
  }, [temp]);
  function getData(val) {
    setValue(val.target.value);
  }

  window.addEventListener("beforeunload", function (e) {
    var confirmationMessage =
      "It looks like you have been editing something. " +
      "If you leave before saving, your changes will be lost.";

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
  });

  const submitBasicDetails = () => {
    formSubmitting = true;
    //  console.log(neweducation);

    const newdata = {
      id: data.id,
      name: nameRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      phone: phoneRef.current.value,
      city: CityRef.current.value,
      state: StateRef.current.value,
      pincode: pinRef.current.value,
      skill: skillRef.current.value,
      perfection: skillperRef.current.value,
      introduction: IntroRef.current.value,
      cv_id: state.user.cv_id,
    };
    console.log("newdata", newdata);
    if (
      nameRef.current.value != "" &&
      emailRef.current.value != "" &&
      (addressRef.current.value !== "") & (phoneRef.current.value != "") &&
      CityRef.current.value != "" &&
      StateRef.current.value !== "" &&
      pinRef.current.value !== ""
    ) {
      UpdateBasicDetails(newdata).then((res) => {
        console.log("UpdateBasicDetails", newdata);
        alert(res.data.message);
        navigate("/dashboard");
      });
      console.log(newdata);
      setTemp((prev) => !prev);
    } else {
      alert("please enter required Details to continue");
    }
  };
  const handleEdu = (e) => {
    const { name, value } = e.target;

    setEditData({ ...edit, [name]: value });
    console.log(edit);
  };

  const SubmitEducation = (index) => {
    UpdateEducation({
      degree: edit.degree,
      percentage: edit.percentage,
      institute: edit.institute,
      edu_id: state.user.education[index].edu_id,
      cv_id: state.user.cv_id,
    }).then((res) => {
      if (res.data.err == 1) {
        alert(res.data.message);
      }

      alert(res.data.message);
      navigate("/dashboard");
      console.log(res.data.address);
      setTemp((prev) => !prev);
    });
  };
  const handleExp = (e) => {
    const { name, value } = e.target;
    seteditexpData({ ...editexp, [name]: value });
    console.log(editexp);
  };
  const submitexprience = (index) => {
    UpdateExperience({
      organization: editexp.organization,
      location: editexp.location,
      ctc: editexp.ctc,
      position: editexp.position,
      leaving: editexp.leaving,
      joining: editexp.joining,
      technology: editexp.technology,
      cv_id: state.user.cv_id,
      exp_id: state.user.experience[index].exp_id,
    }).then((res) => {
      if (res.data.err == 1) {
        alert(res.data.message);
      }

      alert(res.data.message);
      navigate("/dashboard");
      console.log(res.data.address);
      setTemp((prev) => !prev);
    });
  };
  const handleproject = (e) => {
    const { name, value } = e.target;
    seteproject({ ...eproject, [name]: value });
    console.log(eproject);
  };

  const SubmitProject = (index) => {
    UpdateProject({
      title: eproject.title,
      teamsize: eproject.teamsize,
      duration: eproject.duration,
      tech: eproject.tech,
      description: eproject.description,
      cv_id: state.user.cv_id,
      pro_id: state.user.project[index].pro_id,
    }).then((res) => {
      if (res.data.err == 1) {
        alert(res.data.message);
      }

      alert(res.data.message);
      navigate("/dashboard");
      console.log(res.data.address);
      setTemp((prev) => !prev);
    });
  };
  const submitSkill = () => {
    const newdata = {
      skill: skillRef.current.value,
      perfection: skillperRef.current.value,
      cv_id: state.user.cv_id,
    };
    console.log(newdata);
    UpdateSkill(newdata).then((res) => {
      console.log(res.data);
      alert(res.data.message);
      navigate("/dashboard");
    });
  };

  const handleprofile = (e) => {
    const { name, value } = e.target;

    seteprofile({ ...eprofile, [name]: value });
    console.log(eprofile);
  };
  const SubmitProfile = (index) => {
    UpdateSocialProfile({
      profile: eprofile.profile,
      proname: eprofile.proname,
      link: eprofile.link,
      cv_id: state.user.cv_id,
      social_id: state.user.profile[index].social_id,
    }).then((res) => {
      if (res.data.err == 1) {
        alert(res.data.message);
      }

      alert(res.data.message);
      navigate("/dashboard");
      setTemp((prev) => !prev);
    });
  };
  if (!localStorage.getItem("_token")) {
    window.location.replace("/login");
  }
  return (
    <div>
      <nav class="navbar">
        <div class="container-fluid" style={{ marginLeft: "100px" }}>
          <Navbar.Brand style={{ color: "blue", fontSize: "30px" }}>
            <span
              style={{
                color: "red",
                fontWeight: "bold",
                fontFamily: "italic",
                fontSize: "30px",
              }}
            >
              CV
            </span>
            Builder
          </Navbar.Brand>

          <Link to="/dashboard">
            <button className="btn btn-primary" style={{ height: "60px" }}>
              <ArrowBackRoundedIcon /> Go to Dashboard
            </button>
          </Link>
        </div>
      </nav>
      <Container fluid>
        <Row style={{ padding: "2px" }}>
          <Col style={{ border: "1px solid grey", padding: "20px" }} sm={6}>
            <h4>Basic Details</h4>
            <hr />
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      defaultValue={state.user.name}
                      ref={nameRef}
                      onChange={getData}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      defaultValue={state.user.email}
                      name="email"
                      ref={emailRef}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicphone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone"
                      name="phone"
                      defaultValue={state.user.phone}
                      ref={phoneRef}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontaladdress"
              >
                <Form.Label column sm={2}>
                  Address
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    defaultValue={state.user.address}
                    ref={addressRef}
                  />
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicpincode">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Pincode"
                      name="pincode"
                      defaultValue={state.user.pincode}
                      ref={pinRef}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasiccity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter City"
                      name="city"
                      defaultValue={state.user.city}
                      ref={CityRef}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicstate">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter State"
                      name="state"
                      defaultValue={state.user.state}
                      ref={StateRef}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalintroduction"
              >
                <Form.Label column sm={2}>
                  Basic Introduction
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Enter Introduction"
                    name="introduction"
                    defaultValue={state.user.introduction}
                    ref={IntroRef}
                  />
                </Col>
              </Form.Group>
              <Button variant="primary" onClick={() => submitBasicDetails()}>
                Save Basic Details
              </Button>
            </Form>

            <hr />
            <h4>Education</h4>
            <Form>
              <div className="container">
                {state.user.education.map((ele, index) => (
                  <div class="row">
                    <div class="col">
                      <label>Enter Degree</label>
                      <input
                        type="text"
                        class="form-control"
                        name="degree"
                        placeholder="Enter Degree Name"
                        aria-label="degree"
                        ref={degreeref}
                        defaultValue={ele.degree}
                        onChange={handleEdu}
                      />
                    </div>
                    <div class="col">
                      <label>Enter Institute</label>
                      <input
                        type="text"
                        class="form-control"
                        name="institute"
                        placeholder="Enter Institution"
                        aria-label="institutue"
                        ref={instituteref}
                        defaultValue={ele.institute}
                        onChange={handleEdu}
                      />
                    </div>
                    <div class="col">
                      <label>Your %Age</label>
                      <input
                        type="text"
                        class="form-control"
                        name="percentage"
                        placeholder="Enter Percentage"
                        aria-label="percentage"
                        ref={percentageRef}
                        defaultValue={ele.percentage}
                        onChange={handleEdu}
                      />
                    </div>
                    <Button onClick={() => SubmitEducation(index, ele)}>
                      Edit Education
                    </Button>
                  </div>
                ))}
                <br />
                <br />
              </div>
            </Form>

            <hr />

            <div striped bordered hover size="sm" className="mt-5">
              <h3>Work Experience</h3>
              {state.user.experience.map((ele, index) => (
                <div className="d-flex row order-2 p-2 justify-content-between">
                  <div>
                    <label>Organization Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="organization"
                      placeholder="Enter Organization"
                      aria-label="organization"
                      ref={organizationRef}
                      defaultValue={ele.organization}
                      onChange={handleExp}
                    />
                    <label>Location</label>
                    <input
                      type="text"
                      class="form-control"
                      name="location"
                      placeholder="Enter Location"
                      aria-label="location"
                      ref={locationRef}
                      defaultValue={ele.location}
                      onChange={handleExp}
                    />
                  </div>
                  <br />
                  <div>
                    <label>Position</label>
                    <input
                      type="text"
                      class="form-control"
                      name="position"
                      placeholder="Enter Position"
                      aria-label="position"
                      ref={positionRef}
                      defaultValue={ele.position}
                      onChange={handleExp}
                    />
                    <label>CTC</label>
                    <input
                      type="text"
                      class="form-control"
                      name="ctc"
                      placeholder="Enter CTC"
                      aria-label="ctc"
                      ref={CTCRef}
                      defaultValue={ele.ctc}
                      onChange={handleExp}
                    />
                  </div>
                  <br />
                  <div>
                    <label>Joining Date</label>
                    <input
                      type="text"
                      class="form-control"
                      name="joining"
                      placeholder="Enter Joining Date"
                      aria-label="joining"
                      ref={joiningRef}
                      defaultValue={ele.joining}
                      onChange={handleExp}
                    />
                    <label>Leaving Date</label>
                    <input
                      type="text"
                      class="form-control"
                      name="leaving"
                      placeholder="Enter Leaving Date"
                      aria-label="leaving"
                      ref={leavingRef}
                      defaultValue={ele.leaving}
                      onChange={handleExp}
                    />
                  </div>
                  <br />
                  <div>
                    <label>Technologies</label>
                    <input
                      type="text"
                      class="form-control"
                      name="technology"
                      placeholder="Enter Technology"
                      aria-label="technology"
                      ref={technologyRef}
                      defaultValue={ele.technology}
                      onChange={handleExp}
                    />
                    <Button
                      onClick={() => submitexprience(index, ele)}
                      style={{
                        width: "100px",
                        height: "56px",
                        marginTop: "22px",
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                  <div></div>
                </div>
              ))}
            </div>

            <hr />
            <h4>Project Details</h4>
            <div>
              {state.user.project.map((ele, index) => (
                <div className="d-flex row order-2 p-2 justify-content-between">
                  <div>
                    <label>Title</label>
                    <input
                      type="text"
                      class="form-control"
                      name="title"
                      placeholder="Enter project Title"
                      aria-label="title"
                      ref={titleRef}
                      defaultValue={ele.title}
                      onChange={handleproject}
                    />
                    <label>team Size</label>
                    <input
                      type="text"
                      class="form-control"
                      name="teamsize"
                      placeholder="Enter Team Size"
                      aria-label="teamsize"
                      ref={teamsizeRef}
                      defaultValue={ele.teamsize}
                      onChange={handleproject}
                    />
                  </div>
                  <div>
                    <label>Duration</label>
                    <input
                      type="text"
                      class="form-control"
                      name="duration"
                      placeholder="Enter Duration"
                      aria-label="Duration"
                      ref={DurationRef}
                      defaultValue={ele.duration}
                      onChange={handleproject}
                    />
                    <label>Tech</label>
                    <input
                      type="text"
                      class="form-control"
                      name="tech"
                      placeholder="Enter Technology"
                      aria-label="tech"
                      ref={TechRef}
                      defaultValue={ele.tech}
                      onChange={handleproject}
                    />
                  </div>

                  <div className="d-flex row justify-content-between">
                    <label>Description</label>
                    <input
                      type="text"
                      class="form-control"
                      name="description"
                      placeholder="Enter Description"
                      aria-label="description"
                      ref={descRef}
                      defaultValue={ele.description}
                      onChange={handleproject}
                    />
                    <Button
                      onClick={() => SubmitProject(index, ele)}
                      style={{
                        width: "100px",
                        height: "56px",
                        marginTop: "22px",
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <hr />
            <h4>Your Skills</h4>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicskill">
                  <Form.Label>Skill</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Skills"
                    name="skill"
                    ref={skillRef}
                    defaultValue={state.user.skill}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicper">
                  <Form.Label>Perfection in terms of Percentage</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Perfection About skills"
                    name="perfection"
                    ref={skillperRef}
                    defaultValue={state.user.perfection}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button onClick={() => submitSkill()}> Edit skill Details</Button>
            <hr />
            <h4>Social Profiles</h4>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Social Profile</th>
                  <th>Name</th>
                  <th>Profile Link</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {state.user.profile.map((ele, index) => (
                  <tr>
                    <td>
                      {" "}
                      <input
                        type="text"
                        class="form-control"
                        name="profile"
                        placeholder="Enter Social Profile Name"
                        aria-label="profile"
                        ref={profileRef}
                        defaultValue={ele.profile}
                        onChange={handleprofile}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        name="proname"
                        placeholder="Enter Name"
                        aria-label="proname"
                        ref={pronameRef}
                        defaultValue={ele.proname}
                        onChange={handleprofile}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        name="link"
                        placeholder="Enter Links"
                        aria-label="link"
                        ref={linkRef}
                        defaultValue={ele.link}
                        onChange={handleprofile}
                      />
                    </td>
                    <td>
                      <Button onClick={() => SubmitProfile(index, ele)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {bflag == false ? (
              <div className="buttons" style={{ marginTop: "50px" }}></div>
            ) : (
              <div>
                <div className="buttons" style={{ marginTop: "50px" }}>
                  <Button variant="warning">Update</Button>
                </div>
              </div>
            )}
            <br />
          </Col>
          {/* preview and edit part */}
          <Col sm={6} style={{ border: "1px solid grey", paddign: "10px" }}>
            <Container style={{ padding: "1px" }}>
              <nav class="navbar navbar-light bg-light  ">
                <div class="container-fluid" style={{ height: "400px" }}>
                  <img
                    src="https://flyclipart.com/thumb2/business-group-team-icon-395976.png"
                    alt="image"
                    height="120px"
                    width=" 190px"
                    opacity=" 2"
                    class="d-inline-block align-text-top"
                    style={{ marginLeft: "15px", marginTop: "5px" }}
                  />
                  <div>
                    <h5 className={styles.name}>Name: {state.user.name} </h5>
                    <h5 className={styles.name}>
                      <LocalPostOfficeRoundedIcon /> Email: {state.user.email}
                    </h5>
                    <p>
                      <LocalPhoneRoundedIcon /> Phone Number: {state.user.phone}
                    </p>
                    <h3>
                      <HomeRoundedIcon /> Address:-
                    </h3>
                    <p>
                      {" "}
                      {state.user.address} {state.user.city}{" "}
                    </p>
                    <p>
                      {" "}
                      {state.user.state} {state.user.pincode}{" "}
                    </p>
                  </div>
                </div>
              </nav>
              <Container>
                <Row className="border border-dark">
                  <Col sm={5}>
                    <h3 className={styles.heading}>
                      Bio &#187; &#187; &#187;{" "}
                    </h3>
                  </Col>
                  <Col sm={7} className="mt-5">
                    <h6 className={styles.info}>{state.user.introduction}</h6>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="mt-5">
                    <h3 className={styles.heading}>Educational Details</h3>
                    <table class="table " style={{ border: "2px solid grey" }}>
                      <thead>
                        <tr style={{ background: "lightgrey" }}>
                          <th scope="col">Sr No</th>
                          <th scope="col">Degree Name</th>
                          <th scope="col">Institute Name</th>
                          <th scope="col">Percentage</th>
                        </tr>
                      </thead>

                      <tbody>
                        {state.user.education.map((ele, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{ele.degree}</td>
                            <td>{ele.institute}</td>
                            <td>{ele.percentage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={5} className={styles.row}>
                    <h3 className={styles.heading}>Experience Details</h3>
                  </Col>
                  <Col sm={7} className="mt-5">
                    {state.user.experience.map((ele, index) => (
                      <p className={styles.heading1}>
                        {index + 1}. I have Worked with {ele.organization} and
                        the location was {ele.location}.My previous CTC was{" "}
                        {ele.ctc} when i was working in previous company. <br />
                        I have Worked as a {ele.position}in that Company. My
                        Joining Date was {ele.joining} and Leaving Date was{" "}
                        {ele.leaving}. I have worked on {ele.technology}
                      </p>
                    ))}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="mt-5">
                    <h3 className={styles.heading}>Project Details</h3>
                    <table class="table " style={{ border: "2px solid grey" }}>
                      <thead>
                        <tr style={{ background: "lightgrey" }}>
                          <th scope="col">Sr No</th>
                          <th scope="col">Title</th>
                          <th scope="col">Team Size</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Technology used</th>
                          <th scope="col">Description</th>
                        </tr>
                      </thead>

                      <tbody>
                        {state.user.project.map((ele, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{ele.title}</td>
                            <td>{ele.teamsize}</td>
                            <td>{ele.duration}</td>
                            <td>{ele.tech}</td>
                            <td>{ele.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={5} className={styles.row}>
                    <h3 className={styles.heading}>MY Skills</h3>
                  </Col>
                  <Col sm={7} className="mt-5">
                    <h6 className={styles.info}>{state.user.skill}</h6>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={5} className={styles.row}>
                    <h3 className={styles.heading}>Social Profile</h3>
                  </Col>
                  <Col sm={7} className="mt-5">
                    {state.user.profile !== undefined &&
                      state.user.profile.map((ele, index) => (
                        <div>
                          <p>Social Account: {ele.profile}</p>
                          <p>Account Name: {ele.proname}</p>
                          <p>Connect with social Account: {ele.link}</p>
                        </div>
                      ))}
                  </Col>
                </Row>
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Edit;
