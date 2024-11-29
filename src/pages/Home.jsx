import React, { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Import AuthContext
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext

  return (
  <>
    <center className="container mt-5">
      {!user ? (
        <>
          <div className="container mt-5">
            <h2 className="text-center text-secondary fw-bold">Welcome to myJobs!!</h2>
            <hr />
            <h5 className="text-center">
              Welcome to our platform! We offer a variety of job opportunities
              that you can explore and apply for. We're glad you're here, and we
              hope you find the perfect job!
            </h5>
            <hr />
            <h6 className="text-center">
              Feel free to explore the available job listings or post a new job
              if you're an employer by <Link className="text-decoration-none text-primary" to="/login">Logging in</Link> or by <Link className="text-decoration-none text-primary" to="/signup">Signing up</Link> if you are new on the portal :)
            </h6>
          </div>
        </>
      ) : (
        <>
          <div className="container mt-5">
            <h2 className="text-center fw-bold" style={{color: "rgb(51 37 90)"}}>
              Welcome back, {user.username}!
            </h2>
            <hr />
            <h5 className="text-center">
              Glad to see you again! Ready to explore new opportunities or share some exciting ones?
            </h5>
            <hr />
            <div className="mt-4">
              <h6>What would you like to do next?</h6>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <Link to="/jobs" className="btn fw-semibold" style={{backgroundColor: "#e2d8b8"}}> 
                  Browse Job Listings
                </Link>
                <Link to="/jobs/create" className="btn fw-semibold" style={{backgroundColor: "#e2d8b8"}}>
                  Post a New Job
                </Link>
                <Link to="/profile" className="btn fw-semibold" style={{backgroundColor: "#e2d8b8"}}>
                  View Your Profile
                </Link>
              </div>
            </div>
            <hr />
            <p className="text-muted mt-4">
              If you need assistance or have any questions, feel free to contact our support team. We're here to help!
            </p>
          </div>
        </>
      )}
    </center>
    <Footer/>
    </>
  );
};

export default Home;
