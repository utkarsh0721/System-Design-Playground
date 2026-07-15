import * as quizService from '../services/quizService.js';
import { sendSuccess } from '../utils/apiResponse.js';
export const getQuiz = async (req, res) => sendSuccess(res, { data: quizService.getQuiz(req.query.difficulty, req.query.count) });
export const submit = async (req, res) => sendSuccess(res, { statusCode: 201, message: 'Quiz graded', data: await quizService.submitQuiz(req.user.id, req.body) });
export const leaderboard = async (req, res) => sendSuccess(res, { data: { leaderboard: await quizService.getLeaderboard(req.query.limit) } });
export const attempts = async (req, res) => sendSuccess(res, { data: { attempts: await quizService.getUserAttempts(req.user.id) } });
