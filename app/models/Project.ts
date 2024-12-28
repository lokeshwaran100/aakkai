import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  challenge: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  results: [{
    type: String,
    required: true,
  }],
  deliverables: [{
    type: String,
    required: true,
  }],
  client: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'on-hold'],
    default: 'in-progress',
  },
  deadline: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);