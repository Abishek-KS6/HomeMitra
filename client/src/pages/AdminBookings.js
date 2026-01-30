import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminBookings = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [isAuthenticated, user, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/admin/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.patch(`/api/admin/bookings/${bookingId}/status`, { status });
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking status');
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
    return <div style={{ padding: '4rem 0', textAlign: 'center' }}>Loading bookings...</div>;
  }

  return (
    <div style={{ padding: '2rem 0', background: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Manage Bookings</h1>
        
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>No bookings found</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {bookings.map((booking) => (
              <div key={booking._id} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'center' }}>
                  <div>
                    <h4>{booking.service?.name}</h4>
                    <p><strong>Customer:</strong> {booking.customer?.name}</p>
                    <p><strong>Phone:</strong> {booking.customer?.phone}</p>
                  </div>
                  <div>
                    <p><strong>Date:</strong> {new Date(booking.scheduledDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {booking.scheduledTime}</p>
                    <p><strong>Amount:</strong> ₹{booking.totalAmount}</p>
                  </div>
                  <div>
                    <p><strong>Provider:</strong> {booking.provider?.user?.name}</p>
                    <p><strong>Address:</strong> {booking.address}</p>
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
                  </div>
                  <div>
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '5px',
                        border: '1px solid #ddd'
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;