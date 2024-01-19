import { Button} from "react-bootstrap";

const Template1 = ({ setFlag, state , formData,}) => {
  console.log("stateteee" ,state)
  const userImg = require("./Imgg/download.jpeg");
  const Temp = localStorage.getItem("Component");
 
  return (
    <div class="container mt-5 bg-white">
      <div class="row">
        <div class="col-md-6">
          <h3>Personals Details</h3>
          <p>Name: {state?.user?.name?state?.user?.name :formData?.name} </p>
          <p>Email: {state?.user?.email?state?.user?.email :formData?.email}</p>
          <p>Phone: {state?.user?.phone?state?.user?.phone :formData?.phone}</p>
          <p>City: {state?.user?.city?state?.user?.city :formData?.city}</p>
          <p>Address: {state?.user?.address?state?.user?.address :formData?.address}</p>
          <p>Pincode: {state?.user?.pincode?state?.user?.pincode :formData?.pincode}</p>
          <p>Basic Intro: {state?.user?.introduction?state?.user?.introduction :formData?.introduction}</p>
          <p>State: {state?.user?.state?state?.user?.state :formData?.state}</p>
        </div>
        <div class="col-md-6">
          <img
            src={userImg}
            style={{ height: "100px", width: "100px", borderRadius: "50%" }}
          />{" "}
          <br />
          <h3>Bio</h3>
         
          <p>{state?.user?.introduction}</p>
        </div>
      </div>


      <div class="col mt-4">
        <div class="col-md-12">
          <h3>Educational Details</h3>
          <table class="table">
            <thead>
              <tr style={{ background: "lightgrey" }}>
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
          <h3>Experience</h3>
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
          <h3>Projects Details</h3> 
            <table class="table">
              <thead>
                <tr>
                  <th className="h6 text-muted">Sr No</th>
                  <th className="h6 text-muted">Title</th>
                  <th className="h6 text-muted">Team Size</th>
                  <th className="h6 text-muted">Duration</th>
                  <th className="h6 text-muted">Technology used</th>
                  <th className="h6 text-muted">Description</th>
                </tr>
              </thead>

              <tbody>
                {state?.user?.project.map((ele, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td className="h6">{ele?.title}</td>
                    <td className="h6">{ele?.teamsize}</td>
                    <td className="h6">{ele?.duration}</td>
                    <td className="h6">{ele?.tech}</td>
                    <td className="h6">{ele?.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>

      <div className="col mt-4">
        <h3>Skills</h3> <br />
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

      {Temp == "Template1" ? (
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

export default Template1;
