import crypto from 'node:crypto';
import Design from '../models/Design.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { generateArchitecture } from './aiService.js';
import { recordActivity } from './activityService.js';

const owned = async (id, owner) => {
  const design = await Design.findOne({ _id: id, owner });
  if (!design) throw new ApiError(404, 'Design not found');
  return design;
};
const sanitizeInput = (input) => ({ systemName: input.systemName.trim(), expectedUsers: input.expectedUsers, traffic: input.traffic, architectureType: input.architectureType, features: [...new Set(input.features.map((item) => String(item).trim()).filter(Boolean))], customRequirements: String(input.customRequirements || '').trim().slice(0, 3000) });

export const generateAndSave = async (owner, rawInput) => {
  const user = await User.findById(owner);
  if (!user) throw new ApiError(404, 'User not found');
  if (user.aiCredits < 1) throw new ApiError(402, 'No AI credits remaining');
  const input = sanitizeInput(rawInput);
  const result = await generateArchitecture(input);
  const design = await Design.create({ owner, name: input.systemName, input, report: result.report, diagram: result.report.diagram, tags: [input.architectureType, input.traffic] });
  await Promise.all([User.updateOne({ _id: owner, aiCredits: { $gt: 0 } }, { $inc: { aiCredits: -1 } }), recordActivity(owner, 'generate', { design: design.id, label: design.name, metadata: { provider: result.provider } })]);
  return { design, generation: { provider: result.provider, fallbackReason: result.fallbackReason || null } };
};

export const saveDesign = async (owner, payload) => {
  const name = payload.name.trim();
  const suppliedInput = payload.input && typeof payload.input === 'object' ? payload.input : {};
  const input = {
    systemName: suppliedInput.systemName || name,
    expectedUsers: suppliedInput.expectedUsers || '100K',
    traffic: suppliedInput.traffic || 'Medium',
    architectureType: suppliedInput.architectureType || 'Hybrid',
    features: Array.isArray(suppliedInput.features) && suppliedInput.features.length ? suppliedInput.features : ['Authentication'],
    customRequirements: suppliedInput.customRequirements || '',
  };
  const diagram = payload.diagram || payload.report.diagram || { nodes: [], edges: [] };
  return Design.create({ owner, name, input, report: payload.report, diagram, tags: Array.isArray(payload.tags) ? payload.tags.slice(0, 10) : [] });
};

export const listDesigns = async (owner, query) => {
  const page = Math.max(Number(query.page) || 1, 1); const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 50);
  const filter = { owner };
  if (query.favourite === 'true') filter.isFavourite = true;
  if (query.search) {
    const escaped = [...query.search.trim()].map((char) => '\\^$.*+?()[]{}|'.includes(char) ? `\\${char}` : char).join('');
    filter.name = { $regex: escaped, $options: 'i' };
  }
  const sort = query.sort === 'name' ? { name: 1 } : query.sort === 'viewed' ? { lastViewedAt: -1 } : { updatedAt: -1 };
  const [items, total] = await Promise.all([Design.find(filter).select('-report -diagram').sort(sort).skip((page - 1) * limit).limit(limit).lean(), Design.countDocuments(filter)]);
  return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
};
export const getDesign = async (id, owner) => { const design = await owned(id, owner); design.lastViewedAt = new Date(); await design.save(); await recordActivity(owner, 'view', { design: design.id, label: design.name }); return design; };
export const updateDesign = async (id, owner, updates) => {
  const design = await owned(id, owner);
  if (typeof updates.name === 'string') design.name = updates.name.trim().slice(0, 120);
  if (typeof updates.isFavourite === 'boolean') design.isFavourite = updates.isFavourite;
  if (Array.isArray(updates.tags)) design.tags = [...new Set(updates.tags.map(String))].slice(0, 10);
  if (Array.isArray(updates.nodes)) design.diagram.nodes = updates.nodes.slice(0, 30);
  if (!design.name) throw new ApiError(422, 'Design name cannot be empty');
  return design.save();
};
export const removeDesign = async (id, owner) => { const result = await Design.deleteOne({ _id: id, owner }); if (!result.deletedCount) throw new ApiError(404, 'Design not found'); };
export const duplicateDesign = async (id, owner) => { const source = await owned(id, owner); const copy = source.toObject(); delete copy._id; delete copy.id; delete copy.createdAt; delete copy.updatedAt; delete copy.__v; copy.name = `${source.name} Copy`; copy.slug = ''; copy.shareId = undefined; copy.visibility = 'private'; copy.isFavourite = false; return Design.create(copy); };
export const toggleFavourite = async (id, owner, requested) => { const design = await owned(id, owner); design.isFavourite = typeof requested === 'boolean' ? requested : !design.isFavourite; return design.save(); };
export const shareDesign = async (id, owner, enabled = true) => { const design = await owned(id, owner); design.visibility = enabled ? 'unlisted' : 'private'; design.shareId = enabled ? (design.shareId || crypto.randomUUID().replaceAll('-', '')) : undefined; await design.save(); return { shareId: design.shareId || null, visibility: design.visibility }; };
export const getSharedDesign = async (shareId) => { const design = await Design.findOne({ shareId, visibility: 'unlisted' }).populate('owner', 'name avatar'); if (!design) throw new ApiError(404, 'Shared design not found'); return design; };
