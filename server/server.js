const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app',
    'https://homemitra-frontend.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/providers', require('./routes/providers'));
app.use('/api/admin', require('./routes/admin'));

// Temporary seeding route - REMOVE AFTER USE
app.get('/api/seed', async (req, res) => {
  try {
    const services = [
      {
        name: 'Basic Plumbing Repair',
        category: 'plumber',
        description: 'Fix leaky faucets, unclog drains, and basic pipe repairs',
        price: 500,
        duration: '1-2 hours',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop'
      },
      {
        name: 'Emergency Plumbing',
        category: 'plumber',
        description: '24/7 emergency plumbing services for urgent repairs',
        price: 1000,
        duration: '2-3 hours',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
      },
      {
        name: 'Electrical Wiring',
        category: 'electrician',
        description: 'New electrical installations and wiring repairs',
        price: 800,
        duration: '2-4 hours',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop'
      },
      {
        name: 'Switch & Socket Installation',
        category: 'electrician',
        description: 'Install new switches, sockets, and electrical fixtures',
        price: 300,
        duration: '1 hour',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'
      },
      {
        name: 'Security Guard Service',
        category: 'security',
        description: 'Professional security guard for events and properties',
        price: 1200,
        duration: '8 hours',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
      },
      {
        name: 'House Cleaning',
        category: 'maid',
        description: 'Complete house cleaning including all rooms and bathrooms',
        price: 600,
        duration: '3-4 hours',
        image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop'
      },
      {
        name: 'Deep Cleaning',
        category: 'maid',
        description: 'Thorough deep cleaning service for entire house',
        price: 1200,
        duration: '6-8 hours',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
      },
      {
        name: 'AC Repair & Service',
        category: 'ac-repair',
        description: 'Air conditioner repair, servicing, and maintenance',
        price: 700,
        duration: '2-3 hours',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop'
      },
      {
        name: 'AC Installation',
        category: 'ac-repair',
        description: 'New air conditioner installation service',
        price: 1500,
        duration: '4-5 hours',
        image: 'https://images.unsplash.com/photo-1635274531634-c4e0b4b0b8b5?w=400&h=300&fit=crop'
      },
      {
        name: 'Garden Maintenance',
        category: 'gardener',
        description: 'Regular garden maintenance, pruning, and plant care',
        price: 400,
        duration: '2-3 hours',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
      },
      {
        name: 'Landscaping Service',
        category: 'gardener',
        description: 'Complete landscaping and garden design service',
        price: 2000,
        duration: '1-2 days',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop'
      }
    ];

    const Service = require('./models/Service');
    await Service.deleteMany({});
    await Service.insertMany(services);
    
    res.json({ message: 'Services seeded successfully!', count: services.length });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Temporary admin creation route - REMOVE AFTER USE
app.get('/api/create-admin', async (req, res) => {
  try {
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@homemitra.com' });
    if (existingAdmin) {
      return res.json({ message: 'Admin user already exists!', email: 'admin@homemitra.com', password: 'admin123' });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin',
      email: 'admin@homemitra.com',
      password: hashedPassword,
      phone: '9999999999',
      role: 'admin',
      isVerified: true
    });

    await admin.save();
    res.json({ message: 'Admin user created successfully!', email: 'admin@homemitra.com', password: 'admin123' });
  } catch (error) {
    console.error('Admin creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'HomeMitra Backend API is running!' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/homemitra')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));