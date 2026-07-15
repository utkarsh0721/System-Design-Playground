import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['view', 'search', 'generate', 'compare', 'learn', 'quiz'], required: true, index: true },
  design: { type: mongoose.Schema.Types.ObjectId, ref: 'Design', default: null },
  label: { type: String, trim: true, maxlength: 160, default: '' },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });
activitySchema.index({ user: 1, createdAt: -1 });
export default mongoose.model('Activity', activitySchema);
