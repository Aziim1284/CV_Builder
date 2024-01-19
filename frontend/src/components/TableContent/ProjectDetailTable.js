import React from "react";
import { Table } from "react-bootstrap";
const ProjectDetailTable = ({ projectData }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Sr No</th>
          <th> Project Title</th>
          <th>team Size</th>
          <th>Duration</th>
          <th>technology</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>
        {projectData.map((ele, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{ele.title}</td>
            <td>{ele.teamsize}</td>
            <td>{ele.duration}</td>
            <td>{ele.tech}</td>
            <td>{ele.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectDetailTable;
