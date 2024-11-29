import React from 'react';

const Loader = ({ isLoading, message = 'Loading...' }) => {
    if (!isLoading) return null;

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">{message}</span>
                </div>
                <p className="mt-2 text-center">{message}</p>
            </div>
        </div>
    );
};

export default Loader;
