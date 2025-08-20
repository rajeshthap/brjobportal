// src/components/UserPages/LeftNav.js
import React, { useState, useCallback } from "react";
import "../../../assets/css/LeftNav.css";
import { Col, Container, Row } from "react-bootstrap";
import LeftComp from "./LeftComp";
import PostJobCard from "./PostJobCard";
import Adds from "../UserPages/Adds";
import Loading from "../../../api/Loading";

const UserDashBoard = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleFilter = useCallback((data) => {
    setFilteredJobs(data);
    setIsLoading(false);
  }, []);

  return (
    <Container fluid>
      <Row className="abc">
        <Col lg={2} md={2} sm={12} className=" mob-p order-2 order-md-1 post-job-mobile">
          <LeftComp onFilter={handleFilter} />
        </Col>

        <Col lg={8} md={8} sm={12} className="order-1 order-md-2 ">

          {/* <PostJobCard jobs={filteredJobs}  loading={isLoading}  /> */}
          {isLoading ? <Loading /> : <PostJobCard jobs={filteredJobs} />}
        </Col>

        <Col lg={2} md={2} sm={12} className="order-3">
          <Adds />
        </Col>
      </Row>

    </Container>

  );
};

export default UserDashBoard;
