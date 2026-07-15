import * as authService from '../services/authService.js';
import { sendSuccess } from '../utils/apiResponse.js';
export const register = async (req, res) => sendSuccess(res, { statusCode: 201, message: 'Account created', data: await authService.register(req.body) });
export const login = async (req, res) => sendSuccess(res, { message: 'Signed in successfully', data: await authService.login(req.body) });
export const me = async (req, res) => sendSuccess(res, { data: { user: req.user } });
export const logout = async (req, res) => { await authService.logout(req.user.id); return sendSuccess(res, { message: 'Signed out successfully' }); };
