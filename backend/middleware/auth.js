import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { verifyToken } from '../utils/jwt.js';

const protect = asyncHandler(async (req, _res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) throw new ApiError(401, 'Authentication required');
  let payload;
  try { payload = verifyToken(token); } catch { throw new ApiError(401, 'Invalid or expired token'); }
  const user = await User.findById(payload.sub).select('+tokenVersion');
  if (!user) throw new ApiError(401, 'Account no longer exists');
  if (payload.type !== 'access' || payload.ver !== user.tokenVersion) throw new ApiError(401, 'Session has been revoked');
  req.user = user;
  next();
});
export default protect;
