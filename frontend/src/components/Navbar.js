import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const styles = {
    nav: {
        background: '#1a237e', padding: '0 2rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '60px'
    },
    brand: { color: 'white', fontSize: '1.5rem',
        fontWeight: 'bold', textDecoration: 'none' },
    links: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
    link: { color: 'white', textDecoration: 'none', fontSize: '0.95rem' },
    btn: { background: '#ef5350', color: 'white',
        border: 'none', padding: '8px 16px',
        borderRadius: '4px', cursor: 'pointer' },
    user: { color: '#c5cae9', fontSize: '0.9rem' }
};

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <Link to="/properties" style={styles.brand}>🏨 SmartStay</Link>
            <div style={styles.links}>
                <Link to="/properties" style={styles.link}>Properties</Link>
                {user ? (
                    <>
                        <Link to="/my-bookings" style={styles.link}>My Bookings</Link>
                        <Link to="/recommendations" style={styles.link}>Recommendations</Link>
                        <span style={styles.user}>👤 {user.name}</span>
                        <button style={styles.btn} onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}