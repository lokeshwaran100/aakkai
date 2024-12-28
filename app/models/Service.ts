import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
    enum: ['Lightbulb', 'Brush', 'Code'],
  },
  href: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);