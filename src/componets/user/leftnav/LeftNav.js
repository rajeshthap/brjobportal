// src/components/UserPages/LeftNav.js
import React, { useState, useCallback } from "react";
import "../../../assets/css/LeftNav.css";
import { Col, Container, Row } from "react-bootstrap";
import LeftComp from "./LeftComp";
import PostJobCard from "./PostJobCard";
import Adds from "../UserPages/Adds";

const LeftNav = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleFilter = useCallback((data) => {
    setFilteredJobs(data);
  }, []);

  return (
    <Container fluid>
      <Row className="abc">
        <Col lg={2} md={2} sm={12}>
          <LeftComp onFilter={handleFilter} />
        </Col>
        <Col lg={8} md={8} sm={12}>
          <PostJobCard jobs={filteredJobs} />
        </Col>
        <Col lg={2} md={2} sm={12}>
          <Adds />
        </Col>
      </Row>
    </Container>
  );
};

export default LeftNav;
