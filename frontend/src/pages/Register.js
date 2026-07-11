import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../api/api';

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
    select: { width: '100%', padding: '12px',
        marginBottom: '1rem', border: '1px solid #e0e0e0',
        borderRadius: '8px', fontSize: '1rem',
        boxSizing: 'border-box' },
    btn: { width: '100%', padding: '12px',
        background: '#1a237e', color: 'white',
        border: 'none', borderRadius: '8px',
        fontSize: '1rem', cursor: 'pointer' },
    link: { textAlign: 'center', marginTop: '1rem', color: '#666' }
};

export default function Register() {
    const [form, setForm] = useState({
        name: '', email: '', password: '', phone: '', role: 'USER'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(form);
            toast.success('Registered successfully! Please login.');
            navigate('/login');
        } catch (err) {
            toast.error('Registration failed! Email may already exist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>📝 Register</h2>
                <form onSubmit={handleSubmit}>
                    <input style={styles.input} placeholder="Full Name"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        required />
                    <input style={styles.input} type="email"
                        placeholder="Email" value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        required />
                    <input style={styles.input} type="password"
                        placeholder="Password (min 6 chars)" value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}
                        required minLength={6} />
                    <input style={styles.input} placeholder="Phone Number"
                        value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})} />
                    <select style={styles.select} value={form.role}
                        onChange={e => setForm({...form, role: e.target.value})}>
                        <option value="USER">User</option>
                        <option value="HOST">Host</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <button style={styles.btn} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p style={styles.link}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}