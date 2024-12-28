import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);