import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const Experience = ({
  organizationRef,
  positionRef,
  locationRef,
  CTCRef,
  joiningRef,
  leavingRef,
  technologyRef,
  submitexprience,
}) => {
 
  return (
    <div className="container">
      <div class="col">
        <div class="col">
          <input
            type="text"
            class="form-control"
            name="organization"
            placeholder="Enter Organization"
            aria-label="organization"
            ref={organizationRef}
            title="Required Field , write in between 5-30 words"
            min={5}
            max={30}
            required
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            name="position"
            placeholder="Enter Position"
            aria-label="position"
            ref={positionRef}
            title="Required Field , write in between 5-30 words"
            min={5}
            max={30}
            required
          />

        </div>{" "}
        <br />
        <div class="col">
          <input
            type="text"
            class="form-control"
            name="location"
            placeholder="Enter Location"
            aria-label="location"
            ref={locationRef}
            isInvalid={!!Error.position}
            title="Required Field , write in between 5-30 words"
            min={5}
            max={30}
            required
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            name="ctc"
            placeholder="Enter CTC"
            aria-label="ctc"
            ref={CTCRef}
            title="Required field ,Please write in between 1-10 numbers"
            min={1}
            max={20}
            required
          />
        </div>
        <div class="col">
          <input
            type="date"
            ref={joiningRef}
            className="custom-date-picker"
            placeholderText="Please Chosse Your Joining Date"
            name="joining"
            title="Please choose joining date"
          />
        </div>
        <div class="col">
        <input
            type="date"
            ref={leavingRef}
            className="custom-date-picker"
            placeholderText="Please Chosse Your Leaving Date"
            name="leaving"
            title="Please choose Leaving date"
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            name="technology"
            placeholder="Enter Technology"
            aria-label="technology"
            ref={technologyRef}
            title="please write in between 5-30 words"
            min={5}
            max={30}
          />
        </div>
      </div>
      <br />
      <button className="btn btn-info" onClick={() => submitexprience()}>
        Submit Experience
      </button>
      <br />
    </div>
  );
};

export default Experience;
