import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                
                const storedUser = JSON.parse(localStorage.getItem('user'));
                const token = storedUser?.token;

                if (!token) {
                    console.error('No token found. Please log in.');
                    setLoading(false); 
                    return;
                }

                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jobs`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error.response?.data || error.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <Loader isLoading={loading} message="Fetching job opportunities..." />;
    }

    return (
        <div className="container mt-5">
            <h2>Job Listings</h2>
            {jobs.length === 0 ? (
                <p>No job opportunities available currently, please check back later... :)</p>
            ) : (
                <div className="row">
                    {jobs.map((job) => (
                        <div className="col-md-4 mb-4" key={job._id}>
                            <JobCard job={job} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jobs;
