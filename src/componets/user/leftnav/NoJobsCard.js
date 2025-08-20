import React from "react";
import { Card } from "react-bootstrap";

function NoJobsCard({ filters }) {
  const { title, location, experience } = filters;

  const parts = [];
  if (title) parts.push(`title "${title}"`);
  if (location) parts.push(`location "${location}"`);
  if (experience) parts.push(`${experience} experience`);

  let message = "No jobs found.";
  if (parts.length > 0) {
    message = `No jobs found for ${parts.join(" and ")}.`;
  }

  return (
    <Card className="text-center my-3">
      <Card.Body>
        <Card.Title>Job Search</Card.Title>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NoJobsCard;
