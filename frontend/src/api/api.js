import axios from 'axios';

const USER_API    = 'http://localhost:8090';
const PROPERTY_API = 'http://localhost:8084';
const BOOKING_API  = 'http://localhost:8088';

// Add JWT token to every request
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const registerUser = (data) =>
    axios.post(`${USER_API}/users/register`, data);

export const loginUser = (data) =>
    axios.post(`${USER_API}/users/login`, data);

// Property APIs
export const getAllProperties = () =>
    axios.get(`${PROPERTY_API}/properties`);

export const getPropertyById = (id) =>
    axios.get(`${PROPERTY_API}/properties/${id}`);

export const getSimilarProperties = (id) =>
    axios.get(`${PROPERTY_API}/recommendations/similar/${id}`);

export const searchProperties = (location, minPrice, maxPrice) =>
    axios.get(`${PROPERTY_API}/recommendations/search`, {
        params: { location, minPrice, maxPrice }
    });

// Booking APIs
export const createBooking = (data) =>
    axios.post(`${BOOKING_API}/bookings`, data);

export const getMyBookings = (userId) =>
    axios.get(`${BOOKING_API}/bookings/user/${userId}`);

export const confirmBooking = (id) =>
    axios.put(`${BOOKING_API}/bookings/${id}/confirm`);

export const cancelBooking = (id) =>
    axios.put(`${BOOKING_API}/bookings/${id}/cancel`);