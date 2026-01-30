import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminProviders = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    services: [],
    experience: ''
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchProviders();
  }, [isAuthenticated, user, navigate]);

  const fetchProviders = async () => {
    try {
      const response = await axios.get('/api/admin/providers');
      setProviders(response.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/providers', formData);
      fetchProviders();
      resetForm();
      alert('Service provider added successfully!');
    } catch (error) {
      console.error('Error adding provider:', error);
      alert('Failed to add service provider');
    }
  };

  const toggleVerification = async (providerId, currentStatus) => {
    try {
      await axios.patch(`/api/admin/providers/${providerId}/verify`, {
        isVerified: !currentStatus
      });
      fetchProviders();
    } catch (error) {
      console.error('Error updating provider:', error);
      alert('Failed to update provider status');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      services: [],
      experience: ''
    });
    setShowForm(false);
  };

  const handleServiceChange = (service) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service];
    setFormData({...formData, services: updatedServices});
  };

  if (loading) {
    return <div style={{ padding: '4rem 0', textAlign: 'center' }}>Loading providers...</div>;
  }

  return (
    <div style={{ padding: '2rem 0', background: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#2c3e50' }}>Manage Service Providers</h1>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : 'Add New Provider'}
          </button>
        </div>

        {/* Add Provider Form */}
        {showForm && (
          <div className="form-container" style={{ marginBottom: '2rem' }}>
            <h3>Add New Service Provider</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Services (Select multiple)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {['plumber', 'electrician', 'security', 'maid', 'ac-repair', 'gardener'].map(service => (
                    <label key={service} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceChange(service)}
                      />
                      <span style={{ textTransform: 'capitalize' }}>{service.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Experience (years)</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-success">
                  Add Provider
                </button>
                <button type="button" onClick={resetForm} className="btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Providers List */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {providers.map((provider) => (
            <div key={provider._id} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'center' }}>
                <div>
                  <h4>{provider.user?.name}</h4>
                  <p><strong>Email:</strong> {provider.user?.email}</p>
                  <p><strong>Phone:</strong> {provider.user?.phone}</p>
                </div>
                <div>
                  <p><strong>Services:</strong> {provider.services?.join(', ')}</p>
                  <p><strong>Experience:</strong> {provider.experience} years</p>
                  <p><strong>Rating:</strong> {provider.rating}/5 ({provider.totalRatings} reviews)</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    backgroundColor: provider.isVerified ? '#27ae60' : '#e74c3c',
                    marginBottom: '1rem'
                  }}>
                    {provider.isVerified ? 'Verified' : 'Not Verified'}
                  </div>
                  <br />
                  <button
                    onClick={() => toggleVerification(provider._id, provider.isVerified)}
                    className="btn"
                    style={{
                      fontSize: '0.8rem',
                      background: provider.isVerified ? '#e74c3c' : '#27ae60'
                    }}
                  >
                    {provider.isVerified ? 'Unverify' : 'Verify'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProviders;