import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{job.role}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
        <p className="card-text">
          <strong>Salary:</strong> {job.salary} <br />
          <strong>Experience:</strong> {job.experience} years
          <br />
          <strong>Location:</strong> {job.location} <br />
          <strong>Contact:</strong> {job.contactEmail} <br />
          <small className="text-muted">
            Posted by: {job.postedBy?.username || "Unknown"}
          </small> <br/>
          <small className="text-muted">
            Posted on:{" "}
            {job.postedAt
              ? new Date(job.postedAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })
              : "Unknown"}
          </small>
        </p>
      </div>
    </div>
  );
};

export default JobCard;
