import React from "react";

const Education = ({ formData, handleInputChange, submiteducation ,Error}) => {
  return (
    <div className="container">
      <div class="row">
        <div class="col">
          <input
            type="text"
            class="form-control"
            name="degreeref"
            placeholder="Enter Degree Name"
            aria-label="degree"
            value={formData.degreeref}
            onChange={(e) => handleInputChange("degreeref", e.target.value)}
            isInvalid={!!Error.degreeref}
          />
          <p className="text text-danger text-muted h6">{Error.degreeref}</p>
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            name="instituteref"
            placeholder="Enter Institution"
            aria-label="institutue"
            value={formData.instituteref}
            onChange={(e) => handleInputChange("instituteref", e.target.value)}
            isInvalid={!!Error.instituteref}
            />
            <p className="text text-danger text-muted h6">{Error.instituteref}</p>
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            name="percentageRef"
            placeholder="Enter Percentage"
            aria-label="percentage"
            value={formData.percentageRef}
            onChange={(e) => handleInputChange("percentageRef", e.target.value)}
            isInvalid={!!Error.percentageRef}
          />
          <p className="text-danger text-muted h6">{Error.percentageRef}</p>
        </div>
      </div>
      <br />
      <button className="btn btn-info" onClick={() => submiteducation()}>
        Submit Education
      </button>
      <br />
    </div>
  );
};

export default Education;
