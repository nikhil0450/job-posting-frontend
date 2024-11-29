import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import AuthContext from "../context/AuthContext"; 

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        { username, email, password }
      );

      login(data);
      setMessage({ type: "success", text: "Signup successful! Redirecting please wait..." });
      setTimeout(() => navigate("/jobs"), 1500); 
    } catch (error) {
      setMessage({
        type: "danger",
        text:
          error.response?.data?.message || "Signup failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        <div
          className="card p-4 shadow-lg w-100"
          style={{ maxWidth: "400px", borderRadius: "10px" }}
        >
          <div className="text-center mb-4">
            <h2 className="text-secondary fw-bold">Signup</h2>
            <p className="text-muted">Create an account to get started</p>
          </div>
          <form onSubmit={handleSignup}>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary mb-2 fw-bold w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only" />
                </div>
              ) : (
                "Signup"
              )}
            </button>
            {message.text && (
              <div
                className={`alert p-2 text-center alert-${message.type} mt-1`}
                role="alert"
              >
                {message.text}
              </div>
            )}
          </form>
          <div className="text-center">
            <p className="text-muted">
              Already have an account?{" "}
              <Link className="text-decoration-none text-primary" to="/login">
                Login here...
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
