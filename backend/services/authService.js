import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { signToken } from '../utils/jwt.js';

const publicUser = (user) => user.toJSON();
export const register = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  if (await User.exists({ email: normalizedEmail })) throw new ApiError(409, 'An account with this email already exists');
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name: name.trim(), email: normalizedEmail, password: hashedPassword });
  return { user: publicUser(user), token: signToken(user.id, user.tokenVersion) };
};
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password +tokenVersion');
  if (!user || !(await bcrypt.compare(password, user.password))) throw new ApiError(401, 'Invalid email or password');
  user.lastLoginAt = new Date();
  await user.save();
  return { user: publicUser(user), token: signToken(user.id, user.tokenVersion) };
};
export const logout = async (userId) => {
  await User.updateOne({ _id: userId }, { $inc: { tokenVersion: 1 } });
};
