import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Make sure to use the updated CSS

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-heading">404</h1>
        <p className="notfound-message">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-secondary fw-semibold">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
