import { Check, ChevronDown, Copy } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Highlight, themes } from 'prism-react-renderer';

export default function DesignSections({ report = {} }) {
  const sections = [
    ['Functional Requirements', () => <List items={report.functionalRequirements} />],
    ['Non-Functional Requirements', () => <List items={report.nonFunctionalRequirements} />],
    ['Database Design', () => <Database items={report.databaseDesign} />],
    ['API Endpoints', () => <Endpoints items={report.apiEndpoints} />],
    ['Microservices', () => <Cards items={report.microservices} titleKey="name" textKey="responsibility" metaKey="technology" />],
    ['Authentication Flow', () => <Steps items={report.authenticationFlow} />],
    ['Scaling Strategy', () => <List items={report.scalingStrategy} />],
    ['Caching Strategy', () => <List items={report.cachingStrategy} />],
    ['Load Balancer', () => <ObjectDetails value={report.loadBalancer} />],
    ['Redis Usage', () => <List items={report.redisUsage} />],
    ['Kafka Usage', () => <List items={report.kafkaUsage} />],
    ['CDN', () => <List items={report.cdn} />],
    ['Database Sharding', () => <List items={report.databaseSharding} />],
    ['Replication', () => <List items={report.replication} />],
    ['Security', () => <List items={report.security} />],
    ['Rate Limiting', () => <List items={report.rateLimiting} />],
    ['Monitoring', () => <List items={report.monitoring} />],
    ['Logging', () => <List items={report.logging} />],
    ['Estimated Monthly Cost', () => <Cost value={report.estimatedMonthlyCost} />],
    ['Trade-offs', () => <Cards items={report.tradeOffs} titleKey="decision" textKey="benefit" metaKey="cost" />],
    ['Possible Bottlenecks', () => <Cards items={report.bottlenecks} titleKey="risk" textKey="impact" metaKey="mitigation" />],
    ['Future Improvements', () => <List items={report.futureImprovements} />],
    ['Best Practices', () => <List items={report.bestPractices} />],
  ];
  return <div className="space-y-3">{sections.map(([title, content], index) => <Accordion key={title} title={title} defaultOpen={index < 2}>{content()}</Accordion>)}</div>;
}
function Accordion({ title, children, defaultOpen }) { const [open, setOpen] = useState(defaultOpen); return <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.025]"><button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white"><span>{title}</span><ChevronDown size={17} className={`text-slate-500 transition ${open ? 'rotate-180' : ''}`} /></button>{open && <div className="border-t border-white/[.07] px-5 py-5 text-sm text-slate-400">{children}</div>}</section>; }
function List({ items = [] }) { return <ul className="space-y-3">{items.map((item, index) => <li key={`${String(item)}-${index}`} className="flex gap-3 leading-6"><Check size={15} className="mt-1 shrink-0 text-cyan-300" /><span>{typeof item === 'string' ? item : JSON.stringify(item)}</span></li>)}</ul>; }
function Steps({ items = [] }) { return <ol className="space-y-4">{items.map((item, index) => <li key={item} className="flex gap-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-violet-300/10 text-xs text-violet-200">{index + 1}</span><span className="pt-1 leading-6">{item}</span></li>)}</ol>; }
function Cards({ items = [], titleKey, textKey, metaKey }) { return <div className="grid gap-3 md:grid-cols-2">{items.map((item, index) => <div key={`${item[titleKey]}-${index}`} className="rounded-xl border border-white/[.07] bg-black/20 p-4"><h4 className="font-medium text-white">{item[titleKey]}</h4><p className="mt-2 leading-6">{item[textKey]}</p>{item[metaKey] && <p className="mt-3 text-xs text-cyan-300">{item[metaKey]}</p>}</div>)}</div>; }
function Database({ items = [] }) { return <div className="space-y-4">{items.map((item) => <div key={item.name} className="rounded-xl border border-white/[.07] bg-black/20 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><h4 className="font-medium text-white">{item.name}</h4><span className="rounded-lg bg-emerald-300/10 px-2 py-1 text-xs text-emerald-300">{item.type}</span></div><p className="mt-2 leading-6">{item.purpose}</p>{item.schema?.length > 0 && <CodeBlock value={item.schema.join('\n')} />}</div>)}</div>; }
function Endpoints({ items = [] }) { return <div className="overflow-x-auto"><table className="w-full min-w-[540px] text-left"><thead className="text-xs uppercase text-slate-600"><tr><th className="pb-3">Method</th><th className="pb-3">Endpoint</th><th className="pb-3">Purpose</th></tr></thead><tbody>{items.map((item, index) => <tr key={`${item.path}-${index}`} className="border-t border-white/[.06]"><td className="py-3"><span className="font-mono text-xs text-cyan-300">{item.method}</span></td><td className="py-3 font-mono text-xs text-slate-200">{item.path}</td><td className="py-3 text-xs">{item.purpose}</td></tr>)}</tbody></table></div>; }
function ObjectDetails({ value = {} }) { return <dl className="grid gap-3 sm:grid-cols-3">{Object.entries(value).map(([key, item]) => <div key={key} className="rounded-xl bg-black/20 p-4"><dt className="text-xs uppercase text-slate-600">{key}</dt><dd className="mt-2 leading-6 text-slate-300">{item}</dd></div>)}</dl>; }
function Cost({ value = {} }) { return <div><p className="text-2xl font-semibold text-white">${Number(value.low || 0).toLocaleString()}–${Number(value.high || 0).toLocaleString()} <span className="text-sm font-normal text-slate-500">/ month</span></p><div className="mt-5 grid gap-2 sm:grid-cols-2">{value.breakdown?.map((item) => <div key={item.item} className="flex justify-between rounded-xl bg-black/20 p-3"><span>{item.item}</span><span className="text-cyan-300">{item.cost}</span></div>)}</div><div className="mt-4"><List items={value.assumptions} /></div></div>; }
function CodeBlock({ value }) { const copy = () => { navigator.clipboard.writeText(value); toast.success('Copied to clipboard'); }; return <div className="relative mt-4 rounded-xl bg-[#05070c] p-4 font-mono text-xs leading-6"><button onClick={copy} className="absolute right-2 top-2 z-10 rounded-lg p-2 text-slate-600 hover:bg-white/5 hover:text-white" aria-label="Copy code"><Copy size={14} /></button><Highlight theme={themes.nightOwl} code={value} language="sql">{({ className, style, tokens, getLineProps, getTokenProps }) => <pre className={`${className} overflow-x-auto bg-transparent pr-8`} style={{ ...style, background: 'transparent' }}>{tokens.map((line, index) => <div key={index} {...getLineProps({ line })}>{line.map((token, tokenIndex) => <span key={tokenIndex} {...getTokenProps({ token })} />)}</div>)}</pre>}</Highlight></div>; }
