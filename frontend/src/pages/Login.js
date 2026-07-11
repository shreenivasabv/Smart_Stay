import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../api/api';
import { useAuth } from '../context/AuthContext';

const styles = {
    container: { minHeight: '80vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#f5f5f5' },
    card: { background: 'white', padding: '2.5rem',
        borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%', maxWidth: '400px' },
    title: { textAlign: 'center', color: '#1a237e',
        marginBottom: '1.5rem', fontSize: '1.8rem' },
    input: { width: '100%', padding: '12px',
        marginBottom: '1rem', border: '1px solid #e0e0e0',
        borderRadius: '8px', fontSize: '1rem',
        boxSizing: 'border-box' },
    btn: { width: '100%', padding: '12px',
        background: '#1a237e', color: 'white',
        border: 'none', borderRadius: '8px',
        fontSize: '1rem', cursor: 'pointer',
        marginTop: '0.5rem' },
    link: { textAlign: 'center', marginTop: '1rem',
        color: '#666' }
};

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginUser(form);
            login({
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                id: res.data.id
            }, res.data.token);
            toast.success(`Welcome back, ${res.data.name}!`);
            navigate('/properties');
        } catch (err) {
            toast.error('Invalid email or password!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🏨 Login</h2>
                <form onSubmit={handleSubmit}>
                    <input style={styles.input} type="email"
                        placeholder="Email" value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        required />
                    <input style={styles.input} type="password"
                        placeholder="Password" value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}
                        required />
                    <button style={styles.btn} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p style={styles.link}>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}