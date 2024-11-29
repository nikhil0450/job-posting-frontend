import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader"; 

const Profile = () => {
  const { logout } = useContext(AuthContext); 
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(true); 
  const [jobToEdit, setJobToEdit] = useState(null);
  const [updatedJob, setUpdatedJob] = useState({
    company: "",
    role: "",
    salary: "",
    experience: "",
    contactEmail: "",
    location: "",
  });

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    const fetchProfileAndJobs = async () => {
      try {
        const profileResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(profileResponse.data);
        setUsername(profileResponse.data.username);
        setEmail(profileResponse.data.email);

        const jobsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/jobs/my`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJobs(jobsResponse.data);
      } catch (error) {
        console.error("Error fetching profile or jobs:", error);
      } finally {
        setLoadingJobs(false); 
      }
    };

    fetchProfileAndJobs();
  }, [token]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/profile`,
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(response.data.user || response.data); 
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

   // Delete profile
   const deleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      return;
    }
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile deleted successfully.");
      logout(); 
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete profile. Please try again later.");
    }
  };

  // Handle job deletion
  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job deleted successfully");
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Handle job update
  const handleJobUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/jobs/${jobToEdit}`,
        updatedJob,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Job updated successfully!");
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === jobToEdit ? response.data.job : job))
      );
      setJobToEdit(null);
      setUpdatedJob({
        company: "",
        role: "",
        salary: "",
        experience: "",
        contactEmail: "",
        location: "",
      });
    } catch (error) {
      console.error("Error updating job:", error);
      alert(error.response?.data?.message || "Job update failed");
    }
  };

  // Open job update form with current job data
  const openJobUpdateForm = (job) => {
    setJobToEdit(job._id);
    setUpdatedJob({
      company: job.company,
      role: job.role,
      salary: job.salary,
      experience: job.experience,
      contactEmail: job.contactEmail,
      location: job.location,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      {!editMode ? (
        <div>
          <p>
            <strong>Name:</strong> {username || <span className="spinner-border text-dark" role="status">
                <span className="sr-only"></span>
              </span>}
          </p>
          <p>
            <strong>Email:</strong> {email || <span className="spinner-border text-dark" role="status">
                <span className="sr-only"></span>
              </span>}
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={updateProfile}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={deleteProfile}
          >
            Delete Profile
          </button>
        </form>
      )}

      <h3 className="mt-5">Your Job Posts</h3>
      {loadingJobs ? (
        <Loader isLoading={loadingJobs} message="Loading your job posts..." />
      ) : jobs.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Experience</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.company}</td>
                  <td>{job.role}</td>
                  <td>{job.salary}</td>
                  <td>{job.experience}</td>
                  <td>{job.location}</td>
                  <td>{job.contactEmail}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => openJobUpdateForm(job)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No jobs posted by you yet.</p>
      )}
      {/* Job Update Form Modal */}
      {jobToEdit && (
        <div
          className="modal show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Job</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setJobToEdit(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleJobUpdate}>
                  <div className="mb-3">
                    <label>Company</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedJob.company}
                      onChange={(e) =>
                        setUpdatedJob({
                          ...updatedJob,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Role</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedJob.role}
                      onChange={(e) =>
                        setUpdatedJob({ ...updatedJob, role: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Salary</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedJob.salary}
                      onChange={(e) =>
                        setUpdatedJob({ ...updatedJob, salary: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Experience</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedJob.experience}
                      onChange={(e) =>
                        setUpdatedJob({
                          ...updatedJob,
                          experience: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updatedJob.location}
                      onChange={(e) =>
                        setUpdatedJob({
                          ...updatedJob,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Contact Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={updatedJob.contactEmail}
                      onChange={(e) =>
                        setUpdatedJob({
                          ...updatedJob,
                          contactEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setJobToEdit(null)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
