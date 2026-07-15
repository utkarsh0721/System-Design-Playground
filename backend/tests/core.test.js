import assert from 'node:assert/strict';
import test from 'node:test';
import { getTopic, listTopics } from '../services/learningService.js';
import { getQuiz } from '../services/quizService.js';
import { buildFallbackArchitecture, buildFallbackComparison } from '../utils/fallbackData.js';
import { designValidator, registerValidator } from '../utils/validators.js';

const input = { systemName: 'Global Video Platform', expectedUsers: '10 Million', traffic: 'High', architectureType: 'Microservices', features: ['Authentication', 'Media Upload', 'Search', 'Recommendation System'] };

test('fallback architecture contains complete diagram with valid edge endpoints', () => {
  const report = buildFallbackArchitecture(input);
  assert.ok(Object.keys(report).length >= 25);
  assert.ok(report.functionalRequirements.length >= 4);
  assert.ok(report.diagram.nodes.length >= 8);
  const ids = new Set(report.diagram.nodes.map((node) => node.id));
  assert.equal(ids.size, report.diagram.nodes.length);
  for (const edge of report.diagram.edges) { assert.ok(ids.has(edge.source)); assert.ok(ids.has(edge.target)); }
});

test('fallback comparison retains both system identities', () => {
  const result = buildFallbackComparison({ systemA: 'Instagram', systemB: 'TikTok' });
  assert.equal(result.systems.left.name, 'Instagram');
  assert.equal(result.systems.right.name, 'TikTok');
  assert.ok(result.keyDifferences.length > 0);
});

test('request validators reject invalid payloads and accept valid payloads', () => {
  assert.ok(registerValidator({ body: { name: 'A', email: 'bad', password: 'short' } }).length >= 3);
  assert.equal(registerValidator({ body: { name: 'Ada Lovelace', email: 'ada@example.com', password: 'Design123' } }).length, 0);
  assert.equal(designValidator({ body: input }).length, 0);
  assert.ok(designValidator({ body: {} }).length >= 4);
});

test('learning service exposes all mandatory topics with lesson sections', () => {
  assert.equal(listTopics().length, 13);
  const redis = getTopic('redis');
  assert.equal(redis.title, 'Redis');
  assert.ok(redis.interviewQuestions.length > 0);
  assert.ok(redis.animationSteps.length > 0);
});

test('quiz delivery never exposes correct answers', () => {
  const quiz = getQuiz('Hard', 4);
  assert.equal(quiz.questions.length, 4);
  for (const question of quiz.questions) { assert.equal('correctIndex' in question, false); assert.equal('explanation' in question, false); }
});
