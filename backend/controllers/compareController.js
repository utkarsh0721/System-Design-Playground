import { compareSystems } from '../services/compareService.js';
import { sendSuccess } from '../utils/apiResponse.js';
export const compare = async (req, res) => sendSuccess(res, { message: 'Comparison generated', data: await compareSystems(req.user.id, req.body) });
