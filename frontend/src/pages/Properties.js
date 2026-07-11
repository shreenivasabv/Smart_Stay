import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllProperties, searchProperties } from '../api/api';

const styles = {
    container: { padding: '2rem', background: '#f5f5f5', minHeight: '90vh' },
    title: { color: '#1a237e', marginBottom: '1.5rem' },
    searchBar: { display: 'flex', gap: '1rem',
        marginBottom: '2rem', flexWrap: 'wrap' },
    input: { padding: '10px', border: '1px solid #e0e0e0',
        borderRadius: '8px', fontSize: '1rem', flex: 1 },
    btn: { padding: '10px 20px', background: '#1a237e',
        color: 'white', border: 'none', borderRadius: '8px',
        cursor: 'pointer', fontSize: '1rem' },
    clearBtn: { padding: '10px 20px', background: '#757575',
        color: 'white', border: 'none', borderRadius: '8px',
        cursor: 'pointer', fontSize: '1rem' },
    grid: { display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem' },
    card: { background: 'white', borderRadius: '12px',
        padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        cursor: 'pointer', transition: 'transform 0.2s' },
    badge: { display: 'inline-block', padding: '4px 10px',
        borderRadius: '20px', fontSize: '0.8rem',
        fontWeight: 'bold', marginBottom: '0.5rem' },
    price: { fontSize: '1.3rem', fontWeight: 'bold',
        color: '#1a237e', margin: '0.5rem 0' },
    location: { color: '#666', marginBottom: '0.5rem' },
    viewBtn: { width: '100%', padding: '10px',
        background: '#1a237e', color: 'white',
        border: 'none', borderRadius: '8px',
        cursor: 'pointer', marginTop: '1rem' }
};

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState({
        location: '', minPrice: '', maxPrice: ''
    });
    const navigate = useNavigate();

    useEffect(() => { fetchProperties(); }, []);

    const fetchProperties = async () => {
        try {
            const res = await getAllProperties();
            setProperties(res.data);
        } catch {
            toast.error('Failed to load properties!');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!search.location) {
            toast.warning('Please enter a location!');
            return;
        }
        try {
            const res = await searchProperties(
                search.location,
                search.minPrice || 0,
                search.maxPrice || 999999
            );
            setProperties(res.data);
        } catch {
            toast.error('Search failed!');
        }
    };

    const handleClear = () => {
        setSearch({ location: '', minPrice: '', maxPrice: '' });
        fetchProperties();
    };

    const getTypeBadge = (type) => {
        const colors = {
            VILLA: { bg: '#e8f5e9', color: '#2e7d32' },
            HOTEL: { bg: '#e3f2fd', color: '#1565c0' },
            APARTMENT: { bg: '#fff3e0', color: '#e65100' },
        };
        return colors[type] || { bg: '#f3e5f5', color: '#6a1b9a' };
    };

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '5rem', color: '#1a237e' }}>
            Loading properties...
        </div>
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>🏨 Available Properties</h2>

            <div style={styles.searchBar}>
                <input style={styles.input} placeholder="📍 Location (e.g. Goa)"
                    value={search.location}
                    onChange={e => setSearch({...search, location: e.target.value})} />
                <input style={styles.input} type="number"
                    placeholder="Min Price" value={search.minPrice}
                    onChange={e => setSearch({...search, minPrice: e.target.value})} />
                <input style={styles.input} type="number"
                    placeholder="Max Price" value={search.maxPrice}
                    onChange={e => setSearch({...search, maxPrice: e.target.value})} />
                <button style={styles.btn} onClick={handleSearch}>Search</button>
                <button style={styles.clearBtn} onClick={handleClear}>Clear</button>
            </div>

            {properties.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                    No properties found.
                </div>
            ) : (
                <div style={styles.grid}>
                    {properties.map(p => {
                        const badge = getTypeBadge(p.propertyType);
                        return (
                            <div key={p.id} style={styles.card}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                                <span style={{...styles.badge,
                                    background: badge.bg, color: badge.color}}>
                                    {p.propertyType}
                                </span>
                                <h3 style={{ color: '#1a237e', margin: '0.5rem 0' }}>{p.name}</h3>
                                <p style={styles.location}>📍 {p.location}</p>
                                <p style={{ color: '#666', fontSize: '0.9rem' }}>{p.description}</p>
                                <p style={styles.price}>₹{p.pricePerNight}/night</p>
                                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                                    🛏 {p.totalRooms} rooms •
                                    {p.available ?
                                        <span style={{ color: '#2e7d32' }}> ✅ Available</span> :
                                        <span style={{ color: '#c62828' }}> ❌ Not Available</span>
                                    }
                                </p>
                                <button style={styles.viewBtn}
                                    onClick={() => navigate(`/properties/${p.id}`)}>
                                    View & Book
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}