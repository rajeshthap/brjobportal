import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Pagination, Card, Spinner } from "react-bootstrap";

const JobListWithPagination = ({ filteredJobs = [], renderJobCard }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading spinner state
  const jobsPerPage = 10; // Only 10 jobs per page
  const pagesPerGroup = 5; // Show 5 page numbers at a time
  const listRef = useRef(null);

  // Simulate loading when jobs change
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // fake delay for smooth spinner
    setCurrentPage(1);
    return () => clearTimeout(timeout);
  }, [filteredJobs]);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));

  // Calculate job indexes for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  // Slice jobs for current page
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate which group of pages we are in
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // Scroll to job list section on page change
  const scrollToList = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      scrollToList();
    }
  };

  return (
    <>
      {/* Total Jobs Above List */}
      {/* {!loading && (
        <Row className="mb-3">
          <Col className="text-end text-muted">
            Total Jobs: {filteredJobs.length}
          </Col>
        </Row>
      )} */}

      {/* Job List */}
      <Row ref={listRef}>
        {loading ? (
          <Col md={12} className="text-center py-4">
            <Spinner animation="border" variant="primary" />
          </Col>
        ) : currentJobs.length > 0 ? (
          currentJobs.map((job, index) => (
            <Col md={12} key={index}>
              {renderJobCard(job, index)}
            </Col>
          ))
        ) : (
          <Col md={12}>
            <Card className="text-center p-4 shadow-sm">
              <Card.Body>
                <Card.Title>No jobs found</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* Total Jobs Below List */}
      {!loading && currentJobs.length > 0 && (
        <Row>
        <div className="pagingnation-container">
          <div>
            Showing {indexOfFirstJob + 1} -{" "}
            {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
            {filteredJobs.length} jobs
          </div>

          <div>
            {" "}
            {!loading && filteredJobs.length > jobsPerPage && (
              <Pagination className="">
                {/* Previous Page */}
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {/* Previous Group */}
                {startPage > 1 && (
                  <Pagination.Item
                    onClick={() => handlePageChange(startPage - 1)}
                  >
                    &laquo;
                  </Pagination.Item>
                )}

                {/* Page Numbers in Current Group */}
                {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
                  const pageNum = startPage + idx;
                  return (
                    <Pagination.Item
                      key={pageNum}
                      active={pageNum === currentPage}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Pagination.Item>
                  );
                })}

                {/* Next Group */}
                {endPage < totalPages && (
                  <Pagination.Item
                    onClick={() => handlePageChange(endPage + 1)}
                  >
                    &raquo;
                  </Pagination.Item>
                )}

                {/* Next Page */}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            )}
          </div>
        </div>
        </Row>
      )}

      {/* Pagination */}
    </>
  );
};

export default JobListWithPagination;
