import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, select: false },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['developer', 'admin'], default: 'developer' },
  bio: { type: String, maxlength: 280, default: '' },
  preferences: {
    reducedMotion: { type: Boolean, default: false },
    emailUpdates: { type: Boolean, default: true },
    defaultArchitecture: { type: String, enum: ['Monolith', 'Microservices', 'Serverless', 'Hybrid'], default: 'Microservices' },
  },
  aiCredits: { type: Number, default: 100, min: 0 },
  tokenVersion: { type: Number, default: 0, select: false },
  lastLoginAt: Date,
}, { timestamps: true, toJSON: { virtuals: true, transform: (_doc, ret) => { delete ret.password; delete ret.tokenVersion; delete ret.__v; return ret; } } });

export default mongoose.model('User', userSchema);
