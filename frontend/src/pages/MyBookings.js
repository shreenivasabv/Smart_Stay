import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMyBookings, confirmBooking, cancelBooking } from '../api/api';
import { useAuth } from '../context/AuthContext';

const styles = {
    container: { padding: '2rem', background: '#f5f5f5', minHeight: '90vh' },
    title: { color: '#1a237e', marginBottom: '1.5rem' },
    card: { background: 'white', borderRadius: '12px',
        padding: '1.5rem', marginBottom: '1rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
    btnRow: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    confirmBtn: { padding: '8px 16px', background: '#2e7d32',
        color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    cancelBtn: { padding: '8px 16px', background: '#c62828',
        color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
};

const statusColors = {
    PENDING:   { bg: '#fff3e0', color: '#e65100' },
    CONFIRMED: { bg: '#e8f5e9', color: '#2e7d32' },
    CANCELLED: { bg: '#ffebee', color: '#c62828' },
};

export default function MyBookings() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchBookings(); }, []);

    const fetchBookings = async () => {
        try {
            const res = await getMyBookings(user?.id || 1);
            setBookings(res.data);
        } catch {
            toast.error('Failed to load bookings!');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (id) => {
        try {
            await confirmBooking(id);
            toast.success('Booking confirmed!');
            fetchBookings();
        } catch { toast.error('Failed to confirm!'); }
    };

    const handleCancel = async (id) => {
        try {
            await cancelBooking(id);
            toast.success('Booking cancelled!');
            fetchBookings();
        } catch { toast.error('Failed to cancel!'); }
    };

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '5rem' }}>Loading...</div>
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>📋 My Bookings</h2>
            {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                    No bookings yet. <a href="/properties">Browse properties</a>
                </div>
            ) : (
                bookings.map(b => {
                    const sc = statusColors[b.status] || statusColors.PENDING;
                    return (
                        <div key={b.id} style={styles.card}>
                            <div style={{ display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center' }}>
                                <h3 style={{ color: '#1a237e', margin: 0 }}>
                                    Booking #{b.id}
                                </h3>
                                <span style={{ background: sc.bg,
                                    color: sc.color, padding: '4px 12px',
                                    borderRadius: '20px', fontWeight: 'bold',
                                    fontSize: '0.85rem' }}>
                                    {b.status}
                                </span>
                            </div>
                            <p style={{ color: '#666', margin: '0.5rem 0' }}>
                                🏨 Property ID: {b.propertyId}
                            </p>
                            <p style={{ color: '#666', margin: '0.5rem 0' }}>
                                📅 {b.checkIn} → {b.checkOut}
                            </p>
                            <p style={{ color: '#1a237e', fontWeight: 'bold' }}>
                                💰 Total: ₹{b.totalPrice}
                            </p>
                            {b.status === 'PENDING' && (
                                <div style={styles.btnRow}>
                                    <button style={styles.confirmBtn}
                                        onClick={() => handleConfirm(b.id)}>
                                        ✅ Confirm
                                    </button>
                                    <button style={styles.cancelBtn}
                                        onClick={() => handleCancel(b.id)}>
                                        ❌ Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}