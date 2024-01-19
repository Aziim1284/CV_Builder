import React from 'react'
import { Table } from "react-bootstrap";

const PreviousCompanyDetails = ({expdata}) => {
  return (
    <Table striped bordered hover size="sm" className='mt-5'>
    <thead>
        <tr>
            <th>Sr No</th>
            <th>Organization Name</th>
            <th>Location</th>
            <th>Position</th>
            <th>CTC</th>
            <th>Joining Date</th>
            <th>Leaving Date</th>
            <th>Technologies</th>
        </tr>
    </thead>
    <tbody>
        {expdata.map((ele, index) =>
            <tr>
                <td>{index + 1}</td>
                <td>{ele.organization}</td>
                <td>{ele.location}</td>
                <td>{ele.position}</td>
                <td>{ele.ctc}</td>
                <td>{ele.joining}</td>
                <td>{ele.leaving}</td>
                <td>{ele.technology}</td>
            </tr>
        )}
    </tbody>
</Table>
  )
}

export default PreviousCompanyDetails