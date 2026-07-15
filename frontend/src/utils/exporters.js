const safeName = (value) => String(value || 'architecture').trim().replace(/[^a-z0-9-_]+/gi, '-').replace(/(^-|-$)/g, '').toLowerCase() || 'architecture';

const downloadBlob = (content, filename, type) => {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = filename; document.body.appendChild(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const stringify = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(stringify).join(', ');
  return Object.entries(value).map(([key, item]) => `${key}: ${stringify(item)}`).join(' · ');
};

const bulletSection = (title, values = []) => values?.length ? `## ${title}\n\n${values.map((item) => `- ${stringify(item)}`).join('\n')}\n\n` : '';

export const designToMarkdown = (design) => {
  const report = design.report || {};
  const databases = (report.databaseDesign || []).map((item) => `### ${item.name} — ${item.type}\n\n${item.purpose}\n\n${item.schema?.length ? `\`\`\`sql\n${item.schema.join('\n')}\n\`\`\`\n` : ''}`).join('\n');
  const endpoints = report.apiEndpoints?.length ? `| Method | Path | Purpose |\n|---|---|---|\n${report.apiEndpoints.map((item) => `| ${item.method} | \`${item.path}\` | ${item.purpose} |`).join('\n')}` : '';
  const services = (report.microservices || []).map((item) => `- **${item.name}** — ${item.responsibility} _(${item.technology})_`).join('\n');
  const costs = report.estimatedMonthlyCost || {};
  const tradeOffs = (report.tradeOffs || []).map((item) => `- **${item.decision}:** ${item.benefit} Trade-off: ${item.cost}`).join('\n');
  const bottlenecks = (report.bottlenecks || []).map((item) => `- **${item.risk}:** ${item.impact} Mitigation: ${item.mitigation}`).join('\n');
  return `# ${design.name}\n\n> Generated with System Design Playground AI — Developer Edition.\n\n${report.overview || ''}\n\n## Design Input\n\n- **Expected users:** ${design.input?.expectedUsers || 'Not specified'}\n- **Traffic:** ${design.input?.traffic || 'Not specified'}\n- **Architecture:** ${design.input?.architectureType || 'Not specified'}\n- **Features:** ${(design.input?.features || []).join(', ')}\n\n${bulletSection('Functional Requirements', report.functionalRequirements)}${bulletSection('Non-Functional Requirements', report.nonFunctionalRequirements)}## Database Design\n\n${databases || 'Not specified'}\n\n## API Endpoints\n\n${endpoints || 'Not specified'}\n\n## Microservices\n\n${services || 'Not specified'}\n\n${bulletSection('Authentication Flow', report.authenticationFlow)}${bulletSection('Scaling Strategy', report.scalingStrategy)}${bulletSection('Caching Strategy', report.cachingStrategy)}## Load Balancer\n\n${stringify(report.loadBalancer)}\n\n${bulletSection('Redis Usage', report.redisUsage)}${bulletSection('Kafka Usage', report.kafkaUsage)}${bulletSection('CDN', report.cdn)}${bulletSection('Database Sharding', report.databaseSharding)}${bulletSection('Replication', report.replication)}${bulletSection('Security', report.security)}${bulletSection('Rate Limiting', report.rateLimiting)}${bulletSection('Monitoring', report.monitoring)}${bulletSection('Logging', report.logging)}## Estimated Monthly Infrastructure Cost\n\n**${costs.currency || 'USD'} ${(costs.low || 0).toLocaleString()}–${(costs.high || 0).toLocaleString()} per month**\n\n${(costs.breakdown || []).map((item) => `- ${item.item}: ${item.cost}`).join('\n')}\n\n${bulletSection('Cost Assumptions', costs.assumptions)}## Trade-offs\n\n${tradeOffs || 'Not specified'}\n\n## Possible Bottlenecks\n\n${bottlenecks || 'Not specified'}\n\n${bulletSection('Future Improvements', report.futureImprovements)}${bulletSection('Best Practices', report.bestPractices)}---\n\nExported ${new Date().toISOString()}\n`;
};

export const exportJSON = (design) => {
  const payload = { format: 'system-design-playground/v1', exportedAt: new Date().toISOString(), name: design.name, input: design.input, report: design.report, diagram: design.diagram };
  downloadBlob(JSON.stringify(payload, null, 2), `${safeName(design.name)}.json`, 'application/json;charset=utf-8');
};

export const exportMarkdown = (design) => downloadBlob(designToMarkdown(design), `${safeName(design.name)}.md`, 'text/markdown;charset=utf-8');

const getCanvas = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Architecture canvas is not currently visible. Open the Diagram tab and retry.');
  return element;
};

const imageOptions = {
  backgroundColor: '#070a11', pixelRatio: 2, cacheBust: true,
  filter: (node) => !node?.classList?.contains('react-flow__controls') && !node?.classList?.contains('react-flow__minimap') && !node?.classList?.contains('react-flow__panel'),
};

export const exportPNG = async (design, elementId = 'architecture-canvas-export') => {
  const { toPng } = await import('html-to-image');
  const dataUrl = await toPng(getCanvas(elementId), imageOptions);
  const anchor = document.createElement('a'); anchor.href = dataUrl; anchor.download = `${safeName(design.name)}-diagram.png`; anchor.click();
};

const reportLines = (report) => {
  const sections = [
    ['Functional Requirements', report.functionalRequirements], ['Non-Functional Requirements', report.nonFunctionalRequirements],
    ['Database Design', report.databaseDesign], ['API Endpoints', report.apiEndpoints], ['Microservices', report.microservices],
    ['Authentication Flow', report.authenticationFlow], ['Scaling Strategy', report.scalingStrategy], ['Caching Strategy', report.cachingStrategy],
    ['Load Balancer', report.loadBalancer], ['Redis Usage', report.redisUsage], ['Kafka Usage', report.kafkaUsage], ['CDN', report.cdn],
    ['Database Sharding', report.databaseSharding], ['Replication', report.replication], ['Security', report.security],
    ['Rate Limiting', report.rateLimiting], ['Monitoring', report.monitoring], ['Logging', report.logging],
    ['Estimated Monthly Cost', report.estimatedMonthlyCost], ['Trade-offs', report.tradeOffs], ['Possible Bottlenecks', report.bottlenecks],
    ['Future Improvements', report.futureImprovements], ['Best Practices', report.bestPractices],
  ];
  return sections.map(([title, value]) => ({ title, lines: Array.isArray(value) ? value.map((item) => `• ${stringify(item)}`) : [stringify(value)] })).filter((section) => section.lines.some(Boolean));
};

export const exportPDF = async (design, elementId = 'architecture-canvas-export') => {
  const [{ jsPDF }, { toPng }] = await Promise.all([import('jspdf'), import('html-to-image')]);
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
  const pageWidth = doc.internal.pageSize.getWidth(); const pageHeight = doc.internal.pageSize.getHeight(); const margin = 16; const contentWidth = pageWidth - margin * 2;
  doc.setFillColor(9, 9, 11); doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setTextColor(34, 211, 238); doc.setFontSize(10); doc.text('SYSTEM DESIGN PLAYGROUND AI', margin, 18);
  doc.setTextColor(248, 250, 252); doc.setFontSize(24); doc.text(doc.splitTextToSize(design.name, contentWidth), margin, 31);
  doc.setTextColor(148, 163, 184); doc.setFontSize(10); const overview = doc.splitTextToSize(design.report?.overview || '', contentWidth); doc.text(overview, margin, 47);
  let y = 47 + overview.length * 5 + 5;
  try {
    const dataUrl = await toPng(getCanvas(elementId), { ...imageOptions, pixelRatio: 1.5 });
    const image = new Image(); image.src = dataUrl; await image.decode();
    const ratio = image.width / image.height; let width = contentWidth; let height = width / ratio; if (height > 105) { height = 105; width = height * ratio; }
    if (y + height > pageHeight - 15) { doc.addPage(); y = 16; }
    doc.addImage(dataUrl, 'PNG', margin + (contentWidth - width) / 2, y, width, height, undefined, 'FAST'); y += height + 10;
  } catch { /* A report-only PDF remains valid if the canvas is hidden. */ }
  const nextPage = () => { doc.addPage(); doc.setFillColor(9, 9, 11); doc.rect(0, 0, pageWidth, pageHeight, 'F'); y = 18; };
  for (const section of reportLines(design.report || {})) {
    if (y > pageHeight - 28) nextPage();
    doc.setTextColor(34, 211, 238); doc.setFontSize(13); doc.text(section.title, margin, y); y += 7;
    doc.setTextColor(203, 213, 225); doc.setFontSize(9);
    for (const value of section.lines) {
      const lines = doc.splitTextToSize(value, contentWidth);
      if (y + lines.length * 4.3 > pageHeight - 14) nextPage();
      doc.text(lines, margin, y); y += lines.length * 4.3 + 2;
    }
    y += 3;
  }
  doc.setProperties({ title: design.name, subject: 'System architecture design', author: 'System Design Playground AI', creator: 'System Design Playground AI — Developer Edition' });
  doc.save(`${safeName(design.name)}.pdf`);
};
