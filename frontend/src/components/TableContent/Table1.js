import React from 'react'
import { Table } from 'react-bootstrap';
const Table1 = ({edudata}) => {
    console.log("educationdata" ,edudata)
  return (
    <Table striped bordered hover size="sm">
    <thead>
        <tr>
            <th>Sr No</th>
            <th>Degree Name</th>
            <th>Institute</th>
            <th>Percentage</th>
        </tr>
    </thead>
    <tbody>
        {edudata.map((ele, index) =>
        <>
        {console.log("lelement" ,ele)}
            <tr>
                <td>{index + 1}</td>
                <td>{ele.degreeref}</td>
                <td>{ele.instituteref}</td>
                <td>{ele.percentageRef}</td>
            </tr>
            </>
        )}
    </tbody>
</Table>
  )
}

export default Table1