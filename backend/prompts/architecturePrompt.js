const outputContract = `Return ONLY valid JSON with this exact top-level shape:
{
 "overview": "string", "functionalRequirements": ["string"], "nonFunctionalRequirements": ["string"],
 "databaseDesign": [{"name":"string","type":"string","purpose":"string","schema":["string"]}],
 "apiEndpoints": [{"method":"GET|POST|PUT|PATCH|DELETE","path":"string","purpose":"string"}],
 "microservices": [{"name":"string","responsibility":"string","technology":"string"}],
 "authenticationFlow": ["string"], "scalingStrategy": ["string"], "cachingStrategy": ["string"],
 "loadBalancer": {"choice":"string","strategy":"string","reason":"string"},
 "redisUsage": ["string"], "kafkaUsage": ["string"], "cdn": ["string"],
 "databaseSharding": ["string"], "replication": ["string"], "security": ["string"],
 "rateLimiting": ["string"], "monitoring": ["string"], "logging": ["string"],
 "estimatedMonthlyCost": {"currency":"USD","low":0,"high":0,"breakdown":[{"item":"string","cost":"string"}],"assumptions":["string"]},
 "tradeOffs": [{"decision":"string","benefit":"string","cost":"string"}],
 "bottlenecks": [{"risk":"string","impact":"string","mitigation":"string"}],
 "futureImprovements": ["string"], "bestPractices": ["string"],
 "diagram": {"nodes":[{"id":"string","type":"architecture","position":{"x":0,"y":0},"data":{"label":"string","kind":"client|cdn|gateway|service|cache|queue|database|storage|observability","description":"string","technology":"string","detailsKey":"string"}}],"edges":[{"id":"string","source":"string","target":"string","label":"string","type":"smoothstep","animated":true}]}
}`;

export const buildArchitecturePrompt = (input) => `You are a principal distributed-systems architect and FAANG interview coach. Design a realistic production architecture, not a generic tutorial.
System: ${input.systemName}
Expected users: ${input.expectedUsers}
Traffic: ${input.traffic}
Architecture preference: ${input.architectureType}
Features: ${input.features.join(', ')}
Additional requirements: ${input.customRequirements || 'None'}

Use concrete technology choices, explain scale assumptions, cover every requested category, and make costs internally consistent. Diagram must include client, load balancer/API gateway, services, database, Redis, Kafka when useful, CDN, and object storage. Use 8-16 readable nodes, unique IDs, valid edge endpoints, and layered positions from left to right. Never include secrets or executable HTML.

${outputContract}`;
