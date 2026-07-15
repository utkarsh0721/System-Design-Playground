import { getTopic, listTopics } from '../services/learningService.js';
import { recordActivity } from '../services/activityService.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
export const list = async (_req, res) => sendSuccess(res, { data: { topics: listTopics() } });
export const detail = async (req, res) => { const topic = getTopic(req.params.slug); if (!topic) throw new ApiError(404, 'Learning topic not found'); await recordActivity(req.user.id, 'learn', { label: topic.title, metadata: { slug: topic.slug } }); return sendSuccess(res, { data: { topic } }); };
