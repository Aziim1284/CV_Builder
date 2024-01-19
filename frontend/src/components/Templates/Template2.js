import React ,{useState} from "react";
import { Button} from "react-bootstrap";

const Template2 = ({ setFlag, state , formData}) => {
  const userImg = require("./Imgg/download.jpeg");
  const Temp = localStorage.getItem("Component");
  return (
    <div class="container mt-5 bg-white">
      <div class="row">
        <div class="col-md-6">
          <h3 className="text text-danger">Personals Details</h3>
          <p className="text text-primary">Name: {state?.user?.name?state?.user?.name :formData?.name} </p>
          <p className="text text-primary">Email: {state?.user?.email?state?.user?.email :formData?.email}</p>
          <p className="text text-primary">Phone: {state?.user?.phone?state?.user?.phone :formData?.phone}</p>
          <p className="text text-primary">City: {state?.user?.city?state?.user?.city :formData?.city}</p>
          <p className="text text-primary">Address: {state?.user?.address?state?.user?.address :formData?.address}</p>
          <p className="text text-primary">Pincode: {state?.user?.pincode?state?.user?.pincode :formData?.pincode}</p>
          <p className="text text-primary">Basic Intro: {state?.user?.introduction?state?.user?.introduction :formData?.introduction}</p>
          <p className="text text-primary">State: {state?.user?.state?state?.user?.state :formData?.state}</p>
        </div>
        <div class="col-md-6">
          <img
            src={userImg}
            style={{ height: "100px", width: "100px", borderRadius: "50%" }}
          />{" "}
          <br />
          <h3 className="text text-warning">Bio</h3>
          <p>{state?.user?.introduction}</p>
        </div>
      </div>

      <div class="col mt-4">
        <div class="col-md-12">
          <h3 className="text text-danger">Educational Details</h3>
          <table class="table " style={{ border: "2px solid grey" }}>
            <thead>
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Degree Name:  {formData?.degreeref}</th>
                <th scope="col">Institute Name: {formData?.instituteref} </th>
                <th scope="col">Percentage:  {formData?.percentageRef} </th>
              </tr>
            </thead>
            <tbody>
              {state?.user?.education?.map((ele, index) => (
                <tr>
                  <th scope="col">{index + 1}</th>
                  <td>{ele?.degree}</td>
                  <td>{ele?.institute }</td>
                  <td>{ele?.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-12">
          <h3 className="text text-danger">Experience</h3>
          <div className="mt-5 ">
            {state?.user?.experience?.map((ele, index) => (
              <p>
                {index + 1}. I have Worked with {ele?.organization} and the
                location was {ele?.location}.My previous CTC was {ele?.ctc} when
                i was working in previous company. <br />I have Worked as a{" "}
                {ele?.position}in that Company. My Joining Date was{" "}
                {ele?.joining} and Leaving Date was {ele?.leaving}. I have
                worked on {ele?.technology}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div class="col mt-4">
        <div class="col-md-12">
          <h3 className="text text-danger">Projects Details</h3>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" className="theAd text-muted">Sr No</th>
                  <th scope="col" className="theAd text-muted">Title</th>
                  <th scope="col" className="theAd text-muted">Team Size</th>
                  <th scope="col" className="theAd text-muted">Duration</th>
                  <th scope="col" className="theAd text-muted">Technology used</th>
                  <th scope="col" className="theAd text-muted">Description</th>
                </tr>
              </thead>

              <tbody>
                {state?.user?.project.map((ele, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{ele?.title}</td>
                    <td>{ele?.teamsize}</td>
                    <td>{ele?.duration}</td>
                    <td>{ele?.tech}</td>
                    <td>{ele?.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>

      <div className="col mt-4">
        <h3 className="text text-danger">Skills</h3> <br />
        <h6> {state?.user?.skill}</h6>
      </div>
      <br />
      <div className="d-flex justify-content-center align-items-center">
        <div class="col-md-12">
          <h3>Social Profile</h3>

          {state?.user?.profile !== undefined &&
            state?.user?.profile?.map((ele, index) => (
              <div className="d-flex justify-content-center">
                <p>Social Account: {ele?.profile}</p>
                <p>Account Name: {ele?.proname}</p>
                <p>Connect with social Account: {ele?.link}</p>
              </div>
            ))}
        </div>
      </div>

      {Temp == "Template2" ? (
        <div className="row mt-4">
          <div className="col-md-12">
            <Button
              className="btn btn-primary"
              style={{ height: "50px" }}
              onClick={() => {
                setFlag(true);
              }}
            >
              &nbsp; Initiate the CV-building process
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Template2;