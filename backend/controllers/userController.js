import * as userService from '../services/userService.js';
import { sendSuccess } from '../utils/apiResponse.js';
export const getProfile = async (req, res) => sendSuccess(res, { data: { user: req.user } });
export const updateProfile = async (req, res) => sendSuccess(res, { message: 'Profile updated', data: { user: await userService.updateProfile(req.user.id, req.body) } });
