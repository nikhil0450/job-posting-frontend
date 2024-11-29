import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notifications`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="notificationsDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Notifications
            </button>
            <ul className="dropdown-menu" aria-labelledby="notificationsDropdown">
                {notifications.length === 0 ? (
                    <li>
                        <span className="dropdown-item-text">No new notifications</span>
                    </li>
                ) : (
                    notifications.map((notification, index) => (
                        <li key={index}>
                            <span className="dropdown-item-text">
                                New job posted by <strong>{notification.username}</strong>
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Notification;
