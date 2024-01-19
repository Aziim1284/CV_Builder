import React, { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { getAll, UpdateProfilePic ,getGoogle} from "../../Config/ApiStore";
import styles from "../../Navbar.module.css";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { MAIN_URL } from "../../Config/Url";
import NavigationBar from "../Navigations/NavigationBar";
import axios from "axios";
function Profile() {
  const token = localStorage.getItem("_token");
  const [data, setData] = useState();
  const [photo, setPhoto] = useState();
  const [profile, setProfile] = useState();
  const navigate = useNavigate();
  const [temp, setTemp] = useState(false);
  const [newUser, setNewUser] = useState({
    photo: "",
    id: "",
  });
  const [flag1, setFlag1] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("_token") !== undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwtDecode(token);
      console.log("decode", decode);
      setData(decode);
      getAll({ email: decode.uid ? decode.uid : decode.id }).then((res) => {
        if (res.data.err === 0) setProfile(res.data.data);
      });
      getAll().then((res) => {
        if (res.data.err === 0) setPhoto(res.data.data);
      });
    }
  }, [token]);
  const handleSubmit = (e) => {
    localStorage.removeItem("_token");
    e.preventDefault();
    let formData = new FormData();
    formData.append("photo", newUser.photo);
    formData.append("uid", data.uid);
    formData.append("id", data.id);
    formData.append("fname", data.fname);
    formData.append("lname", data.lname);
    formData.append("password", data.password);
    console.log(formData);
    UpdateProfilePic(formData).then((res) => {
      console.log("res.data" ,res.data);
      localStorage.setItem("_token", res.data.token);
      if (res.data.err === 0) alert(res.data.message);
      else alert(res.data.message);
      setTemp((prev) => !prev);
      setFlag1(false);
      navigate("/profile", { replace: true });
    });
  };
  const handlePhoto = (e) => {
    console.log({ photo: e.target.files[0] });
    setNewUser({ ...newUser, photo: e.target.files[0] });
    console.log(newUser.photo);
  };
  if (!localStorage.getItem("_token")) {
    window.location.replace("/login");
  }

  const userProfile = async ()=>{
    const URL = ` ${MAIN_URL}posts/userprofile`; //queryparams =>id_token
    const response = await axios.get(URL,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("reponseprofile" ,response)
  }
  useEffect(()=>{
    userProfile()
  },[])

  return (
    <div>
      <NavigationBar />

      <Container>
        <Card className="text-center mt-5 mb-5">
          <Card.Header className={styles.title}>Profile</Card.Header>
          <Card.Body>
            <Card.Title>
              {data !== undefined && (
                <h4 style={{ color: "#F71E0C" }}>
                  {data.fname} {data.lname}
                </h4>
              )}
            </Card.Title>
            <Card.Text>
              {data !== undefined && (
                <img
                  src={data?.photo}
                  alt="userIcon"
                  height="150px"
                  style={{ borderRadius: "100%" }}
                />
              )}
              <br />
              {/* <Button variant="primary">Go somewhere</Button> */}
              {flag1 ? (
                <form encType="multipart/form-data">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                    onChange={handlePhoto}
                  />
                  <div className="mb-2">
                    <Button
                      variant="primary"
                      style={{
                        marginLeft: "10px",
                        marginTop: "20px",
                        width: "200px",
                      }}
                      fullWidth
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {" "}
                      &nbsp;Submit
                    </Button>
                  </div>{" "}
                </form>
              ) : (
                <div>
                  {" "}
                  <div className="mb-2">
                    <Button
                      variant="primary"
                      onClick={() => setFlag1(true)}
                      style={{
                        marginLeft: "10px",
                        marginTop: "20px",
                        width: "200px",
                      }}
                      fullWidth
                    >
                      {" "}
                      &nbsp;Change Profile
                    </Button>
                  </div>
                </div>
              )}
              <div className="row mb-4 mt-5">
                <div className="col-4 mt-4 mb-4">
                  <p className={styles.profile}>First Name :</p>
                  <p className={styles.profile}>Last Name :</p>
                  <p className={styles.profile}>Email :</p>
                </div>

                <div className="col-8 mt-4 mb-4">
                  {data != undefined && (
                    <>
                      <p>{data.fname}</p>
                      <p>{data.lname}</p>
                      <p>{data.uid}</p>
                    </>
                  )}
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Profile;
