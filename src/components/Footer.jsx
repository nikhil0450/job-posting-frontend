import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-light text-center text-lg-start"
      style={{
        position: "fixed",
        bottom: -10,
        left: 0,
        width: "100%",
        backgroundColor: "#f8f9fa",
        zIndex: 1000, 
        boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)", 
        padding: "8px 0", 
        marginBottom: "0", 
      }}
    >
      <div className="text-center fw-semibold" style={{ fontSize: "0.875rem" }}>
        <p className="mb-1">
          Need assistance or have questions? Contact us at:{" "}
          <a
            href="mailto:support@myjobs.com"
            className="text-decoration-none text-primary"
          >
            support@myjobs.com
          </a>
        </p>
        <p className="text-muted fw-lighter" style={{ fontSize: "0.75rem" }}>
          &copy; {new Date().getFullYear()} myJobs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
