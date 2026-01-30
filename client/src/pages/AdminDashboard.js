import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchStats();
  }, [isAuthenticated, user, navigate]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '4rem 0', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem 0', background: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Users</h3>
            <div className="number">{stats?.totalUsers || 0}</div>
          </div>
          <div className="dashboard-card">
            <h3>Total Services</h3>
            <div className="number">{stats?.totalServices || 0}</div>
          </div>
          <div className="dashboard-card">
            <h3>Total Bookings</h3>
            <div className="number">{stats?.totalBookings || 0}</div>
          </div>
          <div className="dashboard-card">
            <h3>Service Providers</h3>
            <div className="number">{stats?.totalProviders || 0}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Quick Actions</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-card-content" style={{ textAlign: 'center' }}>
                <h3>Manage Bookings</h3>
                <p>View and update booking statuses</p>
                <Link to="/admin/bookings" className="btn btn-primary">
                  View Bookings
                </Link>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card-content" style={{ textAlign: 'center' }}>
                <h3>Manage Services</h3>
                <p>Add, edit, or remove services</p>
                <Link to="/admin/services" className="btn btn-primary">
                  Manage Services
                </Link>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card-content" style={{ textAlign: 'center' }}>
                <h3>Service Providers</h3>
                <p>Manage service provider accounts</p>
                <Link to="/admin/providers" className="btn btn-primary">
                  Manage Providers
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Status Overview */}
        {stats?.bookingStats && (
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Booking Status Overview</h2>
            <div className="dashboard-grid">
              {stats.bookingStats.map((stat) => (
                <div key={stat._id} className="dashboard-card">
                  <h3 style={{ textTransform: 'capitalize' }}>{stat._id}</h3>
                  <div className="number">{stat.count}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;