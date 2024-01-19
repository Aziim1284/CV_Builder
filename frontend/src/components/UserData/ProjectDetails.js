import React from "react";

const ProjectDetails = ({
  titleRef,
  TsRef,
  RefDur,
  TechRef,
  descRef,
  submitProject,
}) => {
  return (
    <div class="col">
      <div class="col">
        <input
          type="text"
          class="form-control"
          name="title"
          placeholder="Enter project Title"
          aria-label="title"
          ref={titleRef}
          title="Required Field ,Please choose your title min. 3 & max 40"
          min={3}
          max={40}
        />
      </div>
      <div class="col">
        <input
          type="number"
          class="form-control"
          name="teamsize"
          placeholder="Enter Team Size"
          aria-label="teamsize"
          ref={TsRef}
          title="Required field , Please choose number only in between 1-10"
          min={1}
          max={10}
          required
        />
      </div>
      <div class="col">
        <input
          type="text"
          class="form-control"
          name="duration"
          placeholder="Enter Duration"
          aria-label="Duration"
          ref={RefDur}
          title="Required field , Please choose duration years / month /days "
          min={1}
          max={50}
          required
        />
      </div>
      <div class="col">
        <input
          type="text"
          class="form-control"
          name="tech"
          placeholder="Enter Technology"
          aria-label="tech"
          ref={TechRef}
          title="Required field , Please choose your Skills in between 5-30 chars"
          min={5}
          max={30}
          required
        />
      </div>
      <div class="col">
        <input
          type="text"
          class="form-control"
          name="description"
          placeholder="Enter Description"
          aria-label="description"
          ref={descRef}
        />
      </div>
      <br />
      <button className="btn btn-info" onClick={() => submitProject()}>
        Submit Project Details
      </button>
      <br />
    </div>
  );
};

export default ProjectDetails;
