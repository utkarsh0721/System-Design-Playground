import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
export const updateProfile = async (userId, updates) => {
  const allowed = {};
  if (typeof updates.name === 'string') allowed.name = updates.name.trim().slice(0, 60);
  if (typeof updates.bio === 'string') allowed.bio = updates.bio.trim().slice(0, 280);
  if (typeof updates.avatar === 'string' && /^(https?:\/\/|data:image\/)/.test(updates.avatar)) allowed.avatar = updates.avatar.slice(0, 1000);
  if (updates.preferences && typeof updates.preferences === 'object') {
    allowed.preferences = {};
    if (typeof updates.preferences.reducedMotion === 'boolean') allowed.preferences.reducedMotion = updates.preferences.reducedMotion;
    if (typeof updates.preferences.emailUpdates === 'boolean') allowed.preferences.emailUpdates = updates.preferences.emailUpdates;
    if (['Monolith', 'Microservices', 'Serverless', 'Hybrid'].includes(updates.preferences.defaultArchitecture)) allowed.preferences.defaultArchitecture = updates.preferences.defaultArchitecture;
  }
  if (allowed.name !== undefined && allowed.name.length < 2) throw new ApiError(422, 'Name must contain at least 2 characters');
  const user = await User.findByIdAndUpdate(userId, { $set: allowed }, { new: true, runValidators: true });
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};
