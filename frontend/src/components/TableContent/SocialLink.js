import React from "react";
import { Table } from "react-bootstrap";

const SocialLink = ({ profileData }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Sr No</th>
          <th>Social Profile</th>
          <th>Name</th>
          <th>Profile Link</th>
        </tr>
      </thead>
      <tbody>
        {profileData.map((ele, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{ele.profile}</td>
            <td>{ele.proname}</td>
            <td>{ele.link}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SocialLink;
