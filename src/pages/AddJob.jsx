import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddJob = () => {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        salary: '',
        experience: '',
        contactEmail: '',
        location: '',
    });

    const [message, setMessage] = useState({ text: '', type: '' }); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            
            const jobData = { ...formData };

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/jobs`, jobData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage({ text: 'Job posted successfully!', type: 'success' });  
            setTimeout(() => navigate('/jobs'), 3000); 
        } catch (error) {
            console.error(error.response?.data || 'An error occurred');
            setMessage({
                text: error.response?.data?.message || 'Failed to post job',
                type: 'error',
            });  
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 130px)', overflowX: 'hidden' }}>
            <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '600px', borderRadius: '10px' }}>
                <div className="text-center mb-4">
                    <h2 className="text-secondary fw-bold">Add Job</h2>
                    <p className="text-muted">Post a new job opportunity</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="company" className="form-label">Company</label>
                            <input
                                type="text"
                                id="company"
                                className="form-control"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="role" className="form-label">Role</label>
                            <input
                                type="text"
                                id="role"
                                className="form-control"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="salary" className="form-label">Salary</label>
                            <input
                                type="text"
                                id="salary"
                                className="form-control"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="experience" className="form-label">Experience</label>
                            <input
                                type="text"
                                id="experience"
                                className="form-control"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="contactEmail" className="form-label">Contact Email</label>
                            <input
                                type="email"
                                id="contactEmail"
                                className="form-control"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input
                                type="text"
                                id="location"
                                className="form-control"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-secondary fw-bold w-100">Post Job</button>
                    {message.text && (
                    <div className={`alert mt-2 p-2 text-center alert-${message.type === 'success' ? 'success' : 'danger'}`}>
                        {message.text}
                    </div>
                )}

                </form>
            </div>
        </div>
    );
};

export default AddJob;
