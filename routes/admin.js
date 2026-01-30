const express = require('express');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const ServiceProvider = require('../models/ServiceProvider');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Get dashboard stats
router.get('/stats', auth, adminAuth, async (req, res) => {
  try {
    const [totalUsers, totalServices, totalBookings, totalProviders] = await Promise.all([
      User.countDocuments(),
      Service.countDocuments(),
      Booking.countDocuments(),
      ServiceProvider.countDocuments()
    ]);

    const bookingStats = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      totalUsers,
      totalServices,
      totalBookings,
      totalProviders,
      bookingStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings
router.get('/bookings', auth, adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customer', 'name email phone')
      .populate('provider')
      .populate('service')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
router.patch('/bookings/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate(['customer', 'provider', 'service']);
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all service providers
router.get('/providers', auth, adminAuth, async (req, res) => {
  try {
    const providers = await ServiceProvider.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new service provider
router.post('/providers', auth, adminAuth, async (req, res) => {
  try {
    const { name, email, password, phone, services, experience } = req.body;
    
    // Create user account
    const user = new User({
      name,
      email,
      password,
      phone,
      role: 'provider'
    });
    await user.save();

    // Create provider profile
    const provider = new ServiceProvider({
      user: user._id,
      services,
      experience,
      isVerified: true
    });
    await provider.save();

    res.status(201).json({ user, provider });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify/unverify provider
router.patch('/providers/:id/verify', auth, adminAuth, async (req, res) => {
  try {
    const { isVerified } = req.body;
    const provider = await ServiceProvider.findByIdAndUpdate(
      req.params.id,
      { isVerified },
      { new: true }
    ).populate('user');
    
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all services
router.get('/services', auth, adminAuth, async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new service
router.post('/services', auth, adminAuth, async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update service
router.put('/services/:id', auth, adminAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete service
router.delete('/services/:id', auth, adminAuth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;