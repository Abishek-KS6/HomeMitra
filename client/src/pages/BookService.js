import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BookService = () => {
  const { serviceId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [providers, setProviders] = useState([]);
  const [formData, setFormData] = useState({
    provider: '',
    scheduledDate: '',
    scheduledTime: '',
    address: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  // ✅ MOVE THIS ABOVE useEffect
  const fetchServiceAndProviders = useCallback(async () => {
    try {
      const [serviceRes, providersRes] = await Promise.all([
        axios.get(`/api/services/${serviceId}`),
        axios.get(`/api/providers?service=${serviceId}`)
      ]);

      setService(serviceRes.data);
      setProviders(providersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchServiceAndProviders();
  }, [serviceId, isAuthenticated, navigate, fetchServiceAndProviders]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBooking(true);

    try {
      const bookingData = {
        ...formData,
        service: serviceId,
        totalAmount: service.price
      };

      await axios.post('/api/bookings', bookingData);
      alert('Booking successful! Check your dashboard for details.');
      navigate('/dashboard');
    } catch (error) {
      alert('Booking failed. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Service not found</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0', background: '#f8f9fa', minHeight: '80vh' }}>
      {/* rest unchanged */}
    </div>
  );
};

export default BookService;
