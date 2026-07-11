import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import MyBookings from './pages/MyBookings';
import Recommendations from './pages/Recommendations';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <ToastContainer position="top-right" autoClose={3000} />
                <Routes>
                    <Route path="/"            element={<Navigate to="/properties" />} />
                    <Route path="/login"       element={<Login />} />
                    <Route path="/register"    element={<Register />} />
                    <Route path="/properties"  element={<Properties />} />
                    <Route path="/properties/:id" element={<PropertyDetail />} />
                    <Route path="/my-bookings" element={
                        <PrivateRoute><MyBookings /></PrivateRoute>
                    } />
                    <Route path="/recommendations" element={
                        <PrivateRoute><Recommendations /></PrivateRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;