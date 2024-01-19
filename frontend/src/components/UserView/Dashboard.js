import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  Container,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert2";

import { addCV, getCV} from "../../Config/ApiStore";
import {useNavigate } from "react-router-dom";
import NavigationBar from "../Navigations/NavigationBar";
import jwt_decode from "jwt-decode";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonalDetails from "../UserData/PersonalDetails";
import Table1 from "../TableContent/Table1";
import Experience from "../UserData/Experience";
import ProjectDetailTable from "../TableContent/ProjectDetailTable";
import ProjectDetails from "../UserData/ProjectDetails";
import PreviousCompanyDetails from "../TableContent/PreviousCompanyDetails";
import Education from "../UserData/Education";
import SocialLink from "../TableContent/SocialLink";
import SocialLinkForm from "../UserData/SocialLinkForm";
import Template1 from "../Templates/Template1";
import Template2 from "../Templates/Template2";
import { MAIN_URL } from "../../Config/Url";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});

  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flagexp, setFlagexp] = useState(false);
  const [flagprofile, setFlagProfile] = useState(false);
  const [flagproject, setFlagproject] = useState(false);
  const [bflag, setBflag] = useState(false);
  const [cv, setCV] = useState([]);
  const navigate = useNavigate();
  const [edudata, setedudata] = useState([]);
  const [expdata, setexpdata] = useState([]);
  const [profileData, setprofiledata] = useState([]);
  const [projectData, setprodata] = useState([]);
  const [skill, setSkill] = useState([]);
  const [temp, setTemp] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);


  const organizationRef = useRef(null);
  const locationRef = useRef(null);
  const CTCRef = useRef(null);
  const positionRef = useRef(null);
  const leavingRef = useRef(null);
  const joiningRef = useRef(null);
  const technologyRef = useRef(null);
  const titleRef = useRef(null);
  const TsRef = useRef(null);
  const RefDur = useRef(null);
  const TechRef = useRef(null);
  const descRef = useRef(null);
  const profileRef = useRef(null);
  const pronameRef = useRef(null);
  const linkRef = useRef(null);
  const skillRef = useRef(null);
  const skillperRef = useRef(null);

  const [formData ,setFormdata] = useState({
    name:"",
    email:"",
    phone:"",
    address:"",
    pincode:"",
    city:"",
    state:"",
    introduction:"",
    instituteref:"",
    degreeref:"",
    percentageRef:""
  })
  const [Error ,setError] = useState({
    name:"",
    email:"",
    phone:"",
    address:"",
    pincode:"",
    city:"",
    state:"",
    introduction:"",
    instituteref:"",
    degreeref:"",
    percentageRef:""
  })
  
  const handleInputChange = (field, value) => {
    setFormdata((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    switch (field) {
      case 'name':
        const nameRegex = /^[A-Za-z]{2,10}$/;
        setError((prevErrors) => ({
          ...prevErrors,
          name: nameRegex.test(value) ? '' : 'Please enter a valid name (2 to 10 characters, only letters)',
        }));
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError((prevErrors) => ({
          ...prevErrors,
          email: emailRegex.test(value) ? '' : 'Please enter a valid email address',
        }));
        break;

      case 'phone':
        const phoneRegex = /^\d{10,12}$/;
        setError((prevErrors) => ({
          ...prevErrors,
          phone: phoneRegex.test(value) ? '' : 'Please enter a valid phone number',
        }));
        
        break;
        case 'address':
        const addregx = /^[a-zA-Z0-9\s]+$/;
        setError((prevErrors) => ({
          ...prevErrors,
          address: addregx.test(value) ? '' : 'Please Enter text in between 2-50 character',
        }));
        
        break;
        case 'pincode':
          const pinRegx = /^\d{6}$/;
          setError((prevErrors) => ({
            ...prevErrors,
            pincode: pinRegx.test(value) ? '' : 'Please Enter 6 digits pincode number' ,
          }));
          
          break;  case 'city':
          const cityregx = /^[A-Za-z]{3,20}$/;
          setError((prevErrors) => ({
            ...prevErrors,
            city: cityregx.test(value) ? '' : 'Please Enter text in between 3-20 character',
          }));
          
          break;
          case 'state':
            const stateRegx = /^[A-Za-z]{5,20}$/;
            setError((prevErrors) => ({
              ...prevErrors,
              state: stateRegx.test(value) ? '' : 'Please Enter text in between 5-20 character',
            }));
            
            break;
            case 'introduction':
            const introRegx = /^[a-zA-Z0-9\s]+$/;
            setError((prevErrors) => ({
              ...prevErrors,
              introduction: introRegx.test(value) ? '' : 'Specials characters are not allowed ',
            }));
            
            break;
            case 'degreeref':
            const degreeregx = /^[A-Za-z]{5,20}$/;
            setError((prevErrors) => ({
              ...prevErrors,
              degreeref: degreeregx.test(value) ? '' : 'numbers and special char not allowed limit 5-20',
            }));
            
            break;
            case 'instituteref':
              const instef = /^[^\d]{0,20}$/;
              setError((prevErrors) => ({
                ...prevErrors,
                instituteref: instef.test(value) ? '' : 'numbers and more then 20 chars are not allowed',
              }));
              
              break;
              case 'percentageRef':
                const percecntRegx = /^\d{1,3}$/;
                setError((prevErrors) => ({
                  ...prevErrors,
                  percentageRef: percecntRegx.test(value) ? '' : 'number are allowed and more then 3 chars are not allowed',
                }));
                
                break;
                case 'organizationRef':
                  const organizationRegx = /^[^\d]{0,20}$/;
                  setError((prevErrors) => ({
                    ...prevErrors,
                    organizationRef: organizationRegx.test(value) ? '' : 'only chars are allowed ',
                  }));
                  
                  break;  case 'positionRef':
                  const positionRegx = /^[^\d]{0,20}$/;
                  setError((prevErrors) => ({
                    ...prevErrors,
                    positionRef: positionRegx.test(value) ? '' : 'Chars are allowed',
                  }));
                  
                  break;


      default:
        break;
    }
  };

  const handleButtonClick = (component) => {
    setActiveComponent(component);
    localStorage.setItem("Component", component);
  };

  useEffect(() => {
    if (localStorage.getItem("_token") !== undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode);
      setData(decode);
      getCV().then((res) => {
        const result = res.data;
        console.log("resultlad", result);
        const displayData = result.slice(-3);
        setCV(displayData);
      });
    }
  }, [temp]);

  const submiteducation = () => {
    const neweducation = {
      degreeref: formData.degreeref,
      instituteref: formData.instituteref,
      percentageRef: formData.percentageRef,
      edu_id: Math.random(),
    };
    setedudata([...edudata, neweducation]);
    setFlag2(false);
    // setFormdata({
    //   instituteref:"",
    //   degreeref:"",
    //   percentageRef:""
    // })
  };
  const submitSocial = () => {
    const newesocial = {
      profile: profileRef.current.value,
      proname: pronameRef.current.value,
      link: linkRef.current.value,
      social_id: Math.random(),
    };
    setprofiledata([...profileData, newesocial]);
    setFlagProfile(false);
  };
  const submitexprience = () => {
    const neweexprience = {
      organization: organizationRef.current.value,
      location: locationRef.current.value,
      ctc: CTCRef.current.value,
      position: positionRef.current.value,
      leaving: leavingRef.current.selected,
      joining: joiningRef.current.selected,
      technology: technologyRef.current.value,
      exp_id: Math.random(),
    };
    setexpdata([...expdata, neweexprience]);
    setFlagexp(false);
  };
  const submitProject = () => {
    const newProject = {
      title: titleRef.current.value,
      teamsize: TsRef.current.value,
      duration: RefDur.current.value,
      tech: TechRef.current.value,
      description: descRef.current.value,
      pro_id: Math.random(),
    };
    setprodata([...projectData, newProject]);
    setFlagproject(false);
  };
  const submitdata = () => {
    setFlag(false);
    setBflag(false);
    setFlag2(false);
    setFlagProfile(false);
    setFlagexp(false);
    setFlagproject(false);
    setSkill(false);
    const newdata = {
      id: data.id,
      name: formData.name,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      pincode: formData.pin,
      skill: skillRef.current.value,
      perfection: skillperRef.current.value,
      introduction: formData.introduction,
      education: edudata,
      experience: expdata,
      project: projectData,
      profile: profileData,
      cv_id: Math.random(),
    };
    console.log("newdata" ,newdata);   

    if (
      formData.name != "" &&
      formData.email != "" &&
      (formData.address !== "") & (formData.phone != "") &&
      formData.city != "" &&
      formData.state !== "" &&
      formData.pincode !== "" &&
      skillRef.current.value !== "" &&
      formData.introduction !== ""
    ) {
      addCV(newdata).then((res) => {
        console.log("res.data" ,res);
        alert(res.data.message);
      });
      setTemp((prev) => !prev);
    } else {
      alert("please enter required Details to continue");
    }
  };
  if (!localStorage.getItem("_token")) {
    window.location.replace("/login");
  }
  const Temp =localStorage.getItem("Component")


    const DeleteHandler = async(postId)=>{
      console.log("postid" ,postId)
      const url = `${MAIN_URL}posts/posts/${postId}`
      const response = await axios.delete(url)
      console.log("deleteresponse" ,response)
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "response.data.message",
          timer: 2000,
        });
      }
      }
  return (
    <div>
      <NavigationBar />
      <Container className="mt-5 bgImg">
        <h1 className="m-4 text-white fs-1 fst-italic">
          Effortlessly craft polished resumes swiftly with our intuitive
          platform, ensuring a professional touch for your career advancement.
        </h1>
        {flag ? (
          <div style={{display:"flex" , flexDirection:"row"}} >
            <div className="container card " style={{ padding: "30px" ,width:"50vw" }}>
              <div style={{ marginBottom: "20px", textAlign: "center" }}>
              </div>

              <Form className="border border-success-subtle">
                <>
                  <h4>Basic Details</h4>
                  <hr />
                  <PersonalDetails
                    formData={formData}
                    handleInputChange={handleInputChange}
                    Error={Error}
                  />
                  <hr />
                  <h4>Education</h4>

                  <Table1 edudata={edudata} />

                  {flag2 ? (
                    <>
                      <Education
                        Error={Error}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        submiteducation={submiteducation}
                      />
                    </>
                  ) : (
                    <div className="text-center mt-3">
                      <br />
                      <button
                        onClick={() => setFlag2(true)}
                        className="btn btn-primary"
                      >
                        Add Eduction
                      </button>
                    </div>
                  )}
                </>
                <hr />
                <PreviousCompanyDetails expdata={expdata} />
                {flagexp ? (
                  <>
                    <Experience
                      organizationRef={organizationRef}
                      positionRef={positionRef}
                      locationRef={locationRef}
                      CTCRef={CTCRef}
                      joiningRef={joiningRef}
                      leavingRef={leavingRef}
                      technologyRef={technologyRef}
                      submitexprience={submitexprience}
                      handleInputChange={handleInputChange}
                    />
                  </>
                ) : (
                  <div className="text-center mt-3">
                    <br />
                    <button
                      onClick={() => setFlagexp(true)}
                      className="btn btn-primary"
                    >
                      Add Experience
                    </button>
                  </div>
                )}

                <hr />
                <h4>Project Details</h4>
                <ProjectDetailTable projectData={projectData} />
                {flagproject ? (
                  <>
                    <div className="container ">
                      <ProjectDetails
                        titleRef={titleRef}
                        TsRef={TsRef}
                        RefDur={RefDur}
                        TechRef={TechRef}
                        descRef={descRef}
                        submitProject={submitProject}
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center mt-3">
                    <br />
                    <button
                      onClick={() => setFlagproject(true)}
                      className="btn btn-primary"
                    >
                      Add Project Details
                    </button>
                  </div>
                )}
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
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <hr />
                <h4>Social Profiles</h4>
                <SocialLink profileData={profileData} />
                {flagprofile ? (
                  <>
                    <SocialLinkForm
                      profileRef={profileRef}
                      pronameRef={pronameRef}
                      linkRef={linkRef}
                      submitSocial={submitSocial}
                    />
                  </>
                ) : (
                  <div className="text-center mt-3">
                    <br />
                    <button
                      onClick={() => setFlagProfile(true)}
                      className="btn btn-primary"
                    >
                      Add Social Profile
                    </button>
                  </div>
                )}

                {bflag == false ? (
                  <div className="buttons" style={{ marginTop: "50px" }}>
                    <Button variant="primary" onClick={() => submitdata()}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="buttons" style={{ marginTop: "50px" }}>
                      <Button variant="warning">Update</Button>
                    </div>
                  </div>
                )}
                <br />
              </Form>
            </div>
            <div style={{width:"35vw" ,marginTop:"-45px"}}>
                {Temp == "Template1" ? <Template1 setFlag={setFlag} formData={formData}
                    /> : <Template2 setFlag={setFlag}  formData={formData}/>
                    }
            </div>
          </div>
        ) : (
          <div className="" style={{ padding: "50px" }}>
            <br />
            <h4 className="text-white">Click below to start your journey </h4>
            <span style={{ fontSize: "40px" }}>👇</span>
            <br />
            <span className="text text-white">
              Choose Your Templates to Start building your Cv
            </span>{" "}
            <br />
            <Button onClick={() => handleButtonClick("Template1")}>
              Template1
            </Button>
            <Button onClick={() => handleButtonClick("Template2")}>
              Template2
            </Button>
            {activeComponent === "Template1" && <Template1 setFlag={setFlag} />}
            {activeComponent === "Template2" && <Template2 setFlag={setFlag} />}
            <div>
              <div className="container ">
                <div>
                  <Container className="mt-5">
                    <div>
                      <div className="text">
                        {cv !== undefined &&
                          cv.map((element, index) => (

                            <Container key={element._id}>
                              {console.log("elementtt" ,element)}
                              <Card border="primary" className="text-center">
                                <Card.Header>
                                  Serial Number: {index + 1}
                                </Card.Header>
                                <Card.Body >
                                  <Card.Title>
                                    CV Number: CVno_{index + 100}
                                  </Card.Title>
                                  <Card.Text>
                                    <h5>Name: {element.name}</h5>
                                    <h5>Email: {element.email}</h5>
                                    <h5>Phone: {element.phone}</h5>
                                  </Card.Text>
                                  <Button
                                    variant="primary"
                                    onClick={() =>
                                      navigate("/preview", {
                                        state: { user: element },
                                      })
                                    }
                                  >
                                    <DownloadRoundedIcon /> Preview and Download
                                    the PDF
                                  </Button>
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                  <Button
                                    variant="warning"
                                    onClick={() =>
                                      navigate("/edit", {
                                        state: { user: element },
                                      })
                                    }
                                  >
                                    <EditRoundedIcon /> Edit CV
                                  </Button> 
                                  <Button onClick={()=>DeleteHandler(element._id)} style={{margin:"5px"}}> <DeleteIcon/>Delete Cv</Button>
                                </Card.Body>
                              </Card>
                              <hr />
                            </Container>
                          ))}
                      </div>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Dashboard;
