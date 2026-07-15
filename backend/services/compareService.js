import { compareArchitectures } from './aiService.js';
import { recordActivity } from './activityService.js';
export const compareSystems = async (user, input) => { const result = await compareArchitectures(input); await recordActivity(user, 'compare', { label: `${input.systemA} vs ${input.systemB}`, metadata: { systems: [input.systemA, input.systemB], provider: result.provider } }); return result; };
