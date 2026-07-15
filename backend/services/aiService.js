import env from '../config/env.js';
import { buildArchitecturePrompt } from '../prompts/architecturePrompt.js';
import { buildComparePrompt } from '../prompts/comparePrompt.js';
import { buildFallbackArchitecture, buildFallbackComparison } from '../utils/fallbackData.js';

const stripFences = (text = '') => text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
const parseJson = (text) => JSON.parse(stripFences(text));

const requestGemini = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.geminiModel)}:generateContent?key=${encodeURIComponent(env.geminiApiKey)}`;
  const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(40_000), body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.35, responseMimeType: 'application/json' } }) });
  if (!response.ok) throw new Error(`Gemini request failed (${response.status})`);
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || '';
};

const requestOpenAI = async (prompt) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.openaiApiKey}` }, signal: AbortSignal.timeout(40_000), body: JSON.stringify({ model: env.openaiModel, temperature: 0.35, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: 'Return strict JSON only. You are an expert distributed-systems architect.' }, { role: 'user', content: prompt }] }) });
  if (!response.ok) throw new Error(`OpenAI request failed (${response.status})`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
};

const requestAI = async (prompt) => {
  if (env.aiProvider === 'openai' && env.openaiApiKey) return { text: await requestOpenAI(prompt), provider: 'openai' };
  if (env.geminiApiKey) return { text: await requestGemini(prompt), provider: 'gemini' };
  if (env.openaiApiKey) return { text: await requestOpenAI(prompt), provider: 'openai' };
  return null;
};

const normalizeDiagram = (diagram, fallback) => {
  if (!Array.isArray(diagram?.nodes) || !Array.isArray(diagram?.edges) || diagram.nodes.length < 2) return fallback;
  const seen = new Set();
  const nodes = diagram.nodes.slice(0, 24).map((item, index) => {
    let id = String(item.id || `node-${index}`).replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 60);
    while (seen.has(id)) id = `${id}-${index}`;
    seen.add(id);
    return { id, type: 'architecture', position: { x: Number(item.position?.x) || (index % 4) * 260, y: Number(item.position?.y) || Math.floor(index / 4) * 150 }, data: { label: String(item.data?.label || 'Component').slice(0, 80), kind: String(item.data?.kind || 'service').slice(0, 30), description: String(item.data?.description || '').slice(0, 500), technology: String(item.data?.technology || '').slice(0, 80), detailsKey: String(item.data?.detailsKey || item.data?.technology || 'component').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80) } };
  });
  const ids = new Set(nodes.map((item) => item.id));
  const edges = diagram.edges.filter((item) => ids.has(String(item.source)) && ids.has(String(item.target))).slice(0, 40).map((item, index) => ({ id: String(item.id || `edge-${index}`).replace(/[^a-zA-Z0-9_-]/g, '-'), source: String(item.source), target: String(item.target), label: String(item.label || '').slice(0, 50), type: 'smoothstep', animated: item.animated !== false }));
  return edges.length ? { nodes, edges } : fallback;
};

const mergeArchitecture = (candidate, fallback) => {
  if (!candidate || typeof candidate !== 'object') return fallback;
  const merged = { ...fallback };
  for (const key of Object.keys(fallback)) {
    if (key === 'diagram') continue;
    const value = candidate[key];
    if (Array.isArray(fallback[key]) && Array.isArray(value) && value.length) merged[key] = value;
    else if (!Array.isArray(fallback[key]) && value && typeof value === typeof fallback[key]) merged[key] = value;
  }
  merged.diagram = normalizeDiagram(candidate.diagram, fallback.diagram);
  return merged;
};

export const generateArchitecture = async (input) => {
  const fallback = buildFallbackArchitecture(input);
  try {
    const result = await requestAI(buildArchitecturePrompt(input));
    if (!result) return { report: fallback, provider: 'fallback', fallbackReason: 'AI key is not configured' };
    return { report: mergeArchitecture(parseJson(result.text), fallback), provider: result.provider };
  } catch (error) {
    console.error('AI architecture fallback:', error.message);
    return { report: fallback, provider: 'fallback', fallbackReason: error.message };
  }
};

export const compareArchitectures = async (input) => {
  const fallback = buildFallbackComparison(input);
  try {
    const result = await requestAI(buildComparePrompt(input));
    if (!result) return { comparison: fallback, provider: 'fallback', fallbackReason: 'AI key is not configured' };
    const parsed = parseJson(result.text);
    return { comparison: parsed?.systems && parsed?.keyDifferences ? parsed : fallback, provider: result.provider };
  } catch (error) {
    console.error('AI comparison fallback:', error.message);
    return { comparison: fallback, provider: 'fallback', fallbackReason: error.message };
  }
};
