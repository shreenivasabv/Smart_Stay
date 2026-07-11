import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { searchProperties } from '../api/api';

const styles = {
    container: { padding: '2rem', background: '#f5f5f5', minHeight: '90vh' },
    title: { color: '#1a237e', marginBottom: '1.5rem' },
    searchCard: { background: 'white', borderRadius: '12px',
        padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        marginBottom: '2rem', maxWidth: '600px' },
    input: { width: '100%', padding: '10px',
        marginBottom: '1rem', border: '1px solid #e0e0e0',
        borderRadius: '8px', fontSize: '1rem',
        boxSizing: 'border-box' },
    btn: { width: '100%', padding: '12px',
        background: '#1a237e', color: 'white',
        border: 'none', borderRadius: '8px',
        fontSize: '1rem', cursor: 'pointer' },
    grid: { display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem' },
    card: { background: 'white', borderRadius: '12px',
        padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        cursor: 'pointer' }
};

export default function Recommendations() {
    const [search, setSearch] = useState({
        location: '', minPrice: '', maxPrice: ''
    });
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

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
            setResults(res.data);
            setSearched(true);
            if (res.data.length === 0) {
                toast.info('No properties found for your criteria.');
            }
        } catch {
            toast.error('Search failed!');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>🎯 Find Your Perfect Stay</h2>
            <div style={styles.searchCard}>
                <h3 style={{ color: '#1a237e', marginBottom: '1rem' }}>
                    Search by Preferences
                </h3>
                <input style={styles.input} placeholder="📍 Location (e.g. Goa, Mumbai)"
                    value={search.location}
                    onChange={e => setSearch({...search, location: e.target.value})} />
                <input style={styles.input} type="number"
                    placeholder="💰 Min Price per night"
                    value={search.minPrice}
                    onChange={e => setSearch({...search, minPrice: e.target.value})} />
                <input style={styles.input} type="number"
                    placeholder="💰 Max Price per night"
                    value={search.maxPrice}
                    onChange={e => setSearch({...search, maxPrice: e.target.value})} />
                <button style={styles.btn} onClick={handleSearch}>
                    🔍 Find Recommendations
                </button>
            </div>

            {searched && (
                <>
                    <h3 style={{ color: '#1a237e', marginBottom: '1rem' }}>
                        {results.length} Properties Found
                    </h3>
                    <div style={styles.grid}>
                        {results.map(p => (
                            <div key={p.id} style={styles.card}
                                onClick={() => navigate(`/properties/${p.id}`)}>
                                <h3 style={{ color: '#1a237e', margin: '0 0 0.5rem' }}>
                                    {p.name}
                                </h3>
                                <p style={{ color: '#666', margin: '0.3rem 0' }}>
                                    📍 {p.location}
                                </p>
                                <p style={{ color: '#666', margin: '0.3rem 0',
                                    fontSize: '0.9rem' }}>
                                    {p.propertyType}
                                </p>
                                <p style={{ color: '#1a237e', fontWeight: 'bold',
                                    fontSize: '1.2rem', margin: '0.5rem 0' }}>
                                    ₹{p.pricePerNight}/night
                                </p>
                                <p style={{ color: p.available ? '#2e7d32' : '#c62828',
                                    fontSize: '0.9rem' }}>
                                    {p.available ? '✅ Available' : '❌ Not Available'}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}