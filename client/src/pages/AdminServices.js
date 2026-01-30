import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminServices = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'plumber',
    description: '',
    price: '',
    duration: '',
    image: ''
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchServices();
  }, [isAuthenticated, user, navigate]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/admin/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await axios.put(`/api/admin/services/${editingService._id}`, formData);
      } else {
        await axios.post('/api/admin/services', formData);
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
      price: service.price,
      duration: service.duration,
      image: service.image
    });
    setShowForm(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`/api/admin/services/${serviceId}`);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'plumber',
      description: '',
      price: '',
      duration: '',
      image: ''
    });
    setEditingService(null);
    setShowForm(false);
  };

  if (loading) {
    return <div style={{ padding: '4rem 0', textAlign: 'center' }}>Loading services...</div>;
  }

  return (
    <div style={{ padding: '2rem 0', background: '#f8f9fa', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#2c3e50' }}>Manage Services</h1>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : 'Add New Service'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="form-container" style={{ marginBottom: '2rem' }}>
            <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Service Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="plumber">Plumber</option>
                  <option value="electrician">Electrician</option>
                  <option value="security">Security</option>
                  <option value="maid">Maid</option>
                  <option value="ac-repair">AC Repair</option>
                  <option value="gardener">Gardener</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="e.g., 2-3 hours"
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-success">
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
                <button type="button" onClick={resetForm} className="btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services List */}
        <div className="services-grid">
          {services.map((service) => (
            <div key={service._id} className="service-card">
              <img src={service.image} alt={service.name} />
              <div className="service-card-content">
                <h3>{service.name}</h3>
                <p><strong>Category:</strong> {service.category}</p>
                <p>{service.description}</p>
                <div style={{ marginBottom: '1rem' }}>
                  <span className="price">₹{service.price}</span>
                  <span style={{ marginLeft: '1rem', color: '#666' }}>
                    {service.duration}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleEdit(service)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(service._id)}
                    className="btn"
                    style={{ fontSize: '0.8rem', background: '#e74c3c' }}
                  >
                    Delete
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

export default AdminServices;