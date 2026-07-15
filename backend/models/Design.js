import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, default: 'architecture' },
  position: { x: { type: Number, default: 0 }, y: { type: Number, default: 0 } },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { _id: false });

const edgeSchema = new mongoose.Schema({
  id: { type: String, required: true }, source: { type: String, required: true }, target: { type: String, required: true },
  label: String, type: { type: String, default: 'smoothstep' }, animated: { type: Boolean, default: true },
}, { _id: false, strict: false });

const designSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  slug: { type: String, required: true },
  input: {
    systemName: { type: String, required: true }, expectedUsers: String, traffic: String,
    architectureType: String, features: [{ type: String }], customRequirements: { type: String, maxlength: 3000 },
  },
  report: { type: mongoose.Schema.Types.Mixed, required: true },
  diagram: { nodes: [nodeSchema], edges: [edgeSchema] },
  tags: [{ type: String, trim: true, maxlength: 30 }],
  isFavourite: { type: Boolean, default: false, index: true },
  visibility: { type: String, enum: ['private', 'unlisted'], default: 'private' },
  shareId: { type: String, sparse: true, unique: true, index: true },
  lastViewedAt: { type: Date, default: Date.now, index: true },
}, { timestamps: true, optimisticConcurrency: true });

designSchema.index({ owner: 1, updatedAt: -1 });
designSchema.index({ owner: 1, name: 'text', tags: 'text' });
designSchema.pre('validate', function setSlug(next) {
  if (this.isModified('name') || !this.slug) this.slug = this.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'architecture';
  next();
});

export default mongoose.model('Design', designSchema);
