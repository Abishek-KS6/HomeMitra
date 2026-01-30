import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [isAuthenticated, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/my');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      confirmed: '#3498db',
      'in-progress': '#9b59b6',
      completed: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#666';
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0', background: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ marginBottom: '2rem', color: '#2c3e50' }}>
          Welcome, {user?.name}!
        </h1>

        {/* Dashboard Stats */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Bookings</h3>
            <div className="number">{bookings.length}</div>
          </div>
          <div className="dashboard-card">
            <h3>Completed</h3>
            <div className="number">
              {bookings.filter(b => b.status === 'completed').length}
            </div>
          </div>
          <div className="dashboard-card">
            <h3>Pending</h3>
            <div className="number">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
          </div>
          <div className="dashboard-card">
            <h3>In Progress</h3>
            <div className="number">
              {bookings.filter(b => b.status === 'in-progress').length}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Your Bookings</h2>
          
          {bookings.length === 0 ? (
            <div className="service-card">
              <div className="service-card-content" style={{ textAlign: 'center' }}>
                <h3>No bookings yet</h3>
                <p>Start by browsing our services and make your first booking!</p>
                <button 
                  onClick={() => navigate('/services')}
                  className="btn btn-primary"
                >
                  Browse Services
                </button>
              </div>
            </div>
          ) : (
            <div className="services-grid">
              {bookings.map((booking) => (
                <div key={booking._id} className="service-card">
                  <div className="service-card-content">
                    <h3>{booking.service?.name}</h3>
                    <p><strong>Provider:</strong> {booking.provider?.user?.name}</p>
                    <p><strong>Date:</strong> {new Date(booking.scheduledDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {booking.scheduledTime}</p>
                    <p><strong>Amount:</strong> ₹{booking.totalAmount}</p>
                    <div style={{ 
                      display: 'inline-block',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '15px',
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      backgroundColor: getStatusColor(booking.status),
                      textTransform: 'capitalize'
                    }}>
                      {booking.status}
                    </div>
                    
                    {booking.status === 'completed' && !booking.rating && (
                      <div style={{ marginTop: '1rem' }}>
                        <button className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                          Rate Service
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;