const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

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

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/homemitra');
    
    // Clear existing services
    await Service.deleteMany({});
    
    // Insert new services
    await Service.insertMany(services);
    
    console.log('Services seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();