import * as activityService from '../services/activityService.js';
import { sendSuccess } from '../utils/apiResponse.js';
export const list = async (req, res) => sendSuccess(res, { data: { activities: await activityService.listActivity(req.user.id, req.query) } });
export const create = async (req, res) => sendSuccess(res, { statusCode: 201, data: { activity: await activityService.recordActivity(req.user.id, req.body.type, req.body) } });
export const clear = async (req, res) => { await activityService.clearActivity(req.user.id); return sendSuccess(res, { message: 'Activity history cleared' }); };
