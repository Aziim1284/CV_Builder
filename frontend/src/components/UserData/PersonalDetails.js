import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
const PersonalDetails = ({ formData, handleInputChange ,Error}) => {
  return (
    <Form className="border border-success-subtle">
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicname">
            <Form.Label>Full Name </Form.Label>
            <Form.Control
              value={formData?.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              type="text"
              placeholder="Enter Name"
              name="name"
              isInvalid={!!Error.name}

            />
            <Form.Control.Feedback type="invalid">
              {Error.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={formData?.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              type="email"
              placeholder="Enter Email"
              name="email"
              isInvalid={!!Error.email}
            />
            <Form.Control.Feedback type="invalid">
              {Error.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicphone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={formData?.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              type="number"
              placeholder="Enter phone"
              name="phone"
              isInvalid={!!Error.phone}
            />
             <Form.Control.Feedback type="invalid">
              {Error.phone}
            </Form.Control.Feedback>
          </Form.Group>

        </Col>
      </Row>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontaladdress">
        <Form.Label column sm={2}>
          Address
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            value={formData?.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            as="textarea"
            type="text"
            placeholder="Enter Address"
            name="address"
            isInvalid={!!Error.address}
          />
           <Form.Control.Feedback type="invalid">
              {Error.address}
            </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicpincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              value={formData?.pincode}
              onChange={(e) => handleInputChange("pincode", e.target.value)}
              type="text"
              placeholder="Enter Pincode"
              name="pincode"
              isInvalid={!!Error.pincode}
            />
             <Form.Control.Feedback type="invalid">
              {Error.pincode}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasiccity">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={formData?.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              type="text"
              placeholder="Enter City"
              name="city"
              isInvalid={!!Error.city}
            />
             <Form.Control.Feedback type="invalid">
              {Error.city}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicstate">
            <Form.Label>State</Form.Label>
            <Form.Control
              value={formData?.sate}
              onChange={(e) => handleInputChange("state", e.target.value)}
              type="text"
              placeholder="Enter State"
              name="state"
              isInvalid={!!Error.state}
            />
             <Form.Control.Feedback type="invalid">
              {Error.state}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group
        as={Row}
        className="mb-3"
        controlId="formHorizontalintroduction"
      >
        <Form.Label column sm={2}>
          Basic Introduction
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            value={formData?.introduction}
            onChange={(e) => handleInputChange("introduction", e.target.value)}
            as="textarea"
            type="text"
            placeholder="Enter Introduction"
            name="introduction"
            isInvalid={!!Error.introduction}
          />
          <Form.Control.Feedback type="invalid">
              {Error.introduction}
            </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default PersonalDetails;
