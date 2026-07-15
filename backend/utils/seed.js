import bcrypt from 'bcrypt';
import { connectDatabase, disconnectDatabase } from '../config/db.js';
import Design from '../models/Design.js';
import QuizAttempt from '../models/QuizAttempt.js';
import User from '../models/User.js';
import { buildFallbackArchitecture } from './fallbackData.js';

const run = async () => {
  await connectDatabase();
  const email = 'demo@systemdesign.ai';
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ name: 'Demo Architect', email, password: await bcrypt.hash('Demo1234!', 12), aiCredits: 100 });
  const input = { systemName: 'Global Video Platform', expectedUsers: '10 Million', traffic: 'High', architectureType: 'Microservices', features: ['Authentication', 'Media Upload', 'Search', 'Recommendation System', 'Comments', 'Likes'] };
  if (!(await Design.exists({ owner: user.id, name: input.systemName }))) { const report = buildFallbackArchitecture(input); await Design.create({ owner: user.id, name: input.systemName, input, report, diagram: report.diagram, tags: ['Microservices', 'High'], isFavourite: true }); }
  if (!(await QuizAttempt.exists({ user: user.id }))) await QuizAttempt.create({ user: user.id, difficulty: 'Medium', answers: [{ questionId: 'm-idempotency', selected: 1, correct: true }], score: 1, total: 1, durationSeconds: 22 });
  console.log('Seed complete. Demo login: demo@systemdesign.ai / Demo1234!');
  await disconnectDatabase();
};
run().catch(async (error) => { console.error(error); await disconnectDatabase(); process.exit(1); });
