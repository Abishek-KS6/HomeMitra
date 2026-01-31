import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Services = () => {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [category, fetchServices]);

  const fetchServices = useCallback(async () => {
    try {
      const url = category ? `/api/services?category=${category}` : '/api/services';
      const response = await axios.get(url);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  const categoryNames = {
    plumber: 'Plumbing Services',
    electrician: 'Electrical Services',
    security: 'Security Services',
    maid: 'House Cleaning Services',
    'ac-repair': 'AC Repair Services',
    gardener: 'Gardening Services'
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Loading services...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0', minHeight: '80vh', background: '#f8f9fa' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2c3e50' }}>
          {category ? categoryNames[category] : 'All Services'}
        </h1>
        
        {services.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>No services available at the moment</h3>
            <p>Please check back later or contact support</p>
          </div>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div key={service._id} className="service-card">
                <img src={service.image} alt={service.name} />
                <div className="service-card-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div style={{ marginBottom: '1rem' }}>
                    <span className="price">₹{service.price}</span>
                    <span style={{ marginLeft: '1rem', color: '#666' }}>
                      Duration: {service.duration}
                    </span>
                  </div>
                  <Link 
                    to={`/book/${service._id}`} 
                    className="btn btn-success"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;