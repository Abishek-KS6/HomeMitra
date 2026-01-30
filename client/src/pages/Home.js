import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      name: 'Plumber',
      category: 'plumber',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop',
      description: 'Professional plumbing services for all your needs'
    },
    {
      name: 'Electrician',
      category: 'electrician',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
      description: 'Expert electrical repairs and installations'
    },
    {
      name: 'Security Guard',
      category: 'security',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      description: 'Professional security services for your safety'
    },
    {
      name: 'House Maid',
      category: 'maid',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop',
      description: 'Reliable house cleaning and maintenance'
    },
    {
      name: 'AC Repair',
      category: 'ac-repair',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
      description: 'Air conditioning repair and maintenance'
    },
    {
      name: 'Gardener',
      category: 'gardener',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      description: 'Garden maintenance and landscaping services'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to HomeMitra</h1>
          <p>Your trusted platform for all house work services</p>
          <Link to="/services" className="btn btn-primary">
            Browse Services
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '4rem 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2c3e50' }}>
            Our Services
          </h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.category} className="service-card">
                <img src={service.image} alt={service.name} />
                <div className="service-card-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <Link 
                    to={`/services/${service.category}`} 
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: '#2c3e50' }}>
            Why Choose HomeMitra?
          </h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-card-content">
                <h3>Verified Professionals</h3>
                <p>All our service providers are thoroughly verified and background checked</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card-content">
                <h3>24/7 Support</h3>
                <p>Round the clock customer support for all your queries and concerns</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card-content">
                <h3>Affordable Pricing</h3>
                <p>Competitive and transparent pricing with no hidden charges</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;