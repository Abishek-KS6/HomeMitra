const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  services: [{ type: String, enum: ['plumber', 'electrician', 'security', 'maid', 'ac-repair', 'gardener'] }],
  experience: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  availability: { type: Boolean, default: true },
  workingHours: {
    start: { type: String, default: '09:00' },
    end: { type: String, default: '18:00' }
  },
  serviceArea: [{ type: String }],
  documents: [{
    type: { type: String },
    url: { type: String }
  }],
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);