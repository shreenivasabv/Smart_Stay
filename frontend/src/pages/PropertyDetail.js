import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPropertyById, getSimilarProperties, createBooking } from '../api/api';
import { useAuth } from '../context/AuthContext';

const styles = {
    container: { padding: '2rem', background: '#f5f5f5', minHeight: '90vh' },
    card: { background: 'white', borderRadius: '12px',
        padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        maxWidth: '800px', margin: '0 auto' },
    title: { color: '#1a237e', fontSize: '1.8rem', marginBottom: '0.5rem' },
    price: { fontSize: '1.5rem', fontWeight: 'bold', color: '#1a237e' },
    section: { marginTop: '2rem', padding: '1.5rem',
        background: '#f5f5f5', borderRadius: '8px' },
    input: { width: '100%', padding: '10px',
        marginBottom: '1rem', border: '1px solid #e0e0e0',
        borderRadius: '8px', fontSize: '1rem',
        boxSizing: 'border-box' },
    btn: { width: '100%', padding: '12px',
        background: '#1a237e', color: 'white',
        border: 'none', borderRadius: '8px',
        fontSize: '1rem', cursor: 'pointer' },
    similarGrid: { display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem', marginTop: '1rem' },
    similarCard: { background: 'white', borderRadius: '8px',
        padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        cursor: 'pointer' }
};

export default function PropertyDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [booking, setBooking] = useState({
        checkIn: '', checkOut: '', totalPrice: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPropertyById(id).then(r => setProperty(r.data));
        getSimilarProperties(id).then(r => setSimilar(r.data)).catch(() => {});
    }, [id]);

    const calculatePrice = (checkIn, checkOut, pricePerNight) => {
        if (!checkIn || !checkOut) return 0;
        const days = Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        );
        return days > 0 ? days * pricePerNight : 0;
    };

    const handleDateChange = (field, value) => {
        const updated = { ...booking, [field]: value };
        updated.totalPrice = calculatePrice(
            updated.checkIn, updated.checkOut, property?.pricePerNight
        );
        setBooking(updated);
    };

    const handleBooking = async () => {
        if (!user) { navigate('/login'); return; }
        if (!booking.checkIn || !booking.checkOut) {
            toast.warning('Please select check-in and check-out dates!');
            return;
        }
        if (booking.totalPrice <= 0) {
            toast.warning('Check-out must be after check-in!');
            return;
        }
        setLoading(true);
        try {
            await createBooking({
                userId: user.id || 1,
                propertyId: parseInt(id),
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                totalPrice: booking.totalPrice
            });
            toast.success('Booking created successfully!');
            navigate('/my-bookings');
        } catch (err) {
            toast.error(err.response?.data || 'Booking failed! Dates may conflict.');
        } finally {
            setLoading(false);
        }
    };

    if (!property) return (
        <div style={{ textAlign: 'center', padding: '5rem' }}>Loading...</div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <button onClick={() => navigate(-1)}
                    style={{ background: 'none', border: 'none',
                        cursor: 'pointer', color: '#1a237e',
                        marginBottom: '1rem', fontSize: '1rem' }}>
                    ← Back
                </button>
                <h2 style={styles.title}>{property.name}</h2>
                <p style={{ color: '#666' }}>📍 {property.location} • {property.propertyType}</p>
                <p style={{ color: '#555', margin: '1rem 0' }}>{property.description}</p>
                <p style={styles.price}>₹{property.pricePerNight}/night</p>
                <p style={{ color: '#666' }}>🛏 {property.totalRooms} rooms</p>

                <div style={styles.section}>
                    <h3 style={{ color: '#1a237e', marginBottom: '1rem' }}>
                        📅 Book This Property
                    </h3>
                    <label style={{ color: '#555', fontSize: '0.9rem' }}>Check-in Date</label>
                    <input style={styles.input} type="date"
                        value={booking.checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={e => handleDateChange('checkIn', e.target.value)} />
                    <label style={{ color: '#555', fontSize: '0.9rem' }}>Check-out Date</label>
                    <input style={styles.input} type="date"
                        value={booking.checkOut}
                        min={booking.checkIn}
                        onChange={e => handleDateChange('checkOut', e.target.value)} />
                    {booking.totalPrice > 0 && (
                        <div style={{ background: '#e8eaf6', padding: '1rem',
                            borderRadius: '8px', marginBottom: '1rem' }}>
                            <p style={{ color: '#1a237e', fontWeight: 'bold' }}>
                                Total: ₹{booking.totalPrice}
                            </p>
                        </div>
                    )}
                    <button style={styles.btn} onClick={handleBooking} disabled={loading}>
                        {loading ? 'Booking...' : '🏨 Book Now'}
                    </button>
                </div>

                {similar.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ color: '#1a237e' }}>Similar Properties</h3>
                        <div style={styles.similarGrid}>
                            {similar.map(p => (
                                <div key={p.id} style={styles.similarCard}
                                    onClick={() => navigate(`/properties/${p.id}`)}>
                                    <h4 style={{ color: '#1a237e', margin: '0 0 0.5rem' }}>
                                        {p.name}
                                    </h4>
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                                        📍 {p.location}
                                    </p>
                                    <p style={{ color: '#1a237e', fontWeight: 'bold' }}>
                                        ₹{p.pricePerNight}/night
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}