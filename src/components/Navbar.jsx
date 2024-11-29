import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, loading } = useContext(AuthContext);

    // Prevent navbar rendering until loading is complete
    if (loading) return null;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fw-bold fs-larger" style={{ backgroundColor: "#6c757d" }}>
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">
                myJobs
            </Link>
            {/* Toggle button for smaller screens */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* Collapsible menu */}
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    {user ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/jobs">
                                    Jobs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add-job">
                                    Add Job
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">
                                    Signup
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    </nav>
    );
};

export default Navbar;
