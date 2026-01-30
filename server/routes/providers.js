const express = require('express');
const ServiceProvider = require('../models/ServiceProvider');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all providers
router.get('/', async (req, res) => {
  try {
    const { service, area } = req.query;
    let filter = { isVerified: true, availability: true };
    
    if (service) filter.services = service;
    if (area) filter.serviceArea = { $in: [area] };
    
    const providers = await ServiceProvider.find(filter).populate('user', 'name email phone');
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create provider profile
router.post('/', auth, async (req, res) => {
  try {
    const provider = new ServiceProvider({ ...req.body, user: req.user._id });
    await provider.save();
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get provider by ID
router.get('/:id', async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id).populate('user', 'name email phone');
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;