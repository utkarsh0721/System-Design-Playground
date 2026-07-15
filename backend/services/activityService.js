import Activity from '../models/Activity.js';
export const recordActivity = (user, type, details = {}) => Activity.create({ user, type, design: details.design || null, label: details.label || '', metadata: details.metadata || {} });
export const listActivity = async (user, { type, limit = 20 } = {}) => {
  const filter = { user };
  if (type) filter.type = type;
  return Activity.find(filter).sort({ createdAt: -1 }).limit(Math.min(Number(limit) || 20, 50)).populate('design', 'name slug isFavourite').lean();
};
export const clearActivity = (user) => Activity.deleteMany({ user });
