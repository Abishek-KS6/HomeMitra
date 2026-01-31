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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchServiceAndProviders();
  }, [serviceId, isAuthenticated, navigate, fetchServiceAndProviders]);

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
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Service Details */}
          <div className="service-card" style={{ marginBottom: '2rem' }}>
            <img src={service.image} alt={service.name} />
            <div className="service-card-content">
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <div style={{ marginBottom: '1rem' }}>
                <span className="price">₹{service.price}</span>
                <span style={{ marginLeft: '1rem', color: '#666' }}>
                  Duration: {service.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="form-container">
            <h3 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Book This Service</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Provider</label>
                <select
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a provider</option>
                  {providers.map((provider) => (
                    <option key={provider._id} value={provider._id}>
                      {provider.user.name} - Rating: {provider.rating}/5
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Preferred Date</label>
                <input
                  type="date"
                  name="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label>Preferred Time</label>
                <input
                  type="time"
                  name="scheduledTime"
                  value={formData.scheduledTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Service Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your complete address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Additional Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any specific requirements or details"
                />
              </div>

              <div style={{ 
                background: '#e8f5e8', 
                padding: '1rem', 
                borderRadius: '5px', 
                marginBottom: '1rem' 
              }}>
                <strong>Total Amount: ₹{service.price}</strong>
              </div>

              <button 
                type="submit" 
                className="btn btn-success" 
                style={{ width: '100%' }}
                disabled={booking}
              >
                {booking ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;