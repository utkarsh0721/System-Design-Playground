import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export const signToken = (userId, tokenVersion = 0) => jwt.sign({ sub: userId, type: 'access', ver: tokenVersion }, env.jwtSecret, { expiresIn: env.jwtExpiresIn, issuer: 'system-design-playground' });
export const verifyToken = (token) => jwt.verify(token, env.jwtSecret, { issuer: 'system-design-playground' });
