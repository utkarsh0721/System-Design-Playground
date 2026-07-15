import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { designApi } from '../api/designApi';
import Brand from '../components/Brand';
import ErrorState from '../components/common/ErrorState';
import Skeleton from '../components/common/Skeleton';
import ArchitectureCanvas from '../components/diagram/ArchitectureCanvas';
import DesignSections from '../components/design/DesignSections';

export default function SharedDesignPage() {
  const { shareId } = useParams(); const [design, setDesign] = useState(null); const [error, setError] = useState(''); const [tab, setTab] = useState('diagram');
  const load = useCallback(async () => { try { setDesign(await designApi.getShared(shareId)); } catch (err) { setError(err.response?.data?.message || 'Shared design not found'); } }, [shareId]);
  useEffect(() => { load(); }, [load]);
  return <div className="min-h-screen bg-canvas"><header className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 px-5 py-5"><Brand /><Link to="/register" className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">Build your own</Link></header><main className="mx-auto max-w-7xl px-5 py-10">{error ? <ErrorState message={error} onRetry={load} /> : !design ? <Skeleton className="h-[640px]" /> : <><p className="text-sm text-cyan-300">Shared architecture · by {design.owner?.name || 'an architect'}</p><h1 className="mt-2 text-4xl font-semibold">{design.name}</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{design.report?.overview}</p><div className="mt-7 flex gap-2"><button onClick={() => setTab('diagram')} className={`rounded-xl px-4 py-2 text-sm ${tab === 'diagram' ? 'bg-cyan-300/10 text-cyan-200' : 'text-slate-500'}`}>Interactive diagram</button><button onClick={() => setTab('report')} className={`rounded-xl px-4 py-2 text-sm ${tab === 'report' ? 'bg-cyan-300/10 text-cyan-200' : 'text-slate-500'}`}>Architecture report</button></div><div className="mt-5">{tab === 'diagram' ? <ArchitectureCanvas initialNodes={design.diagram?.nodes} initialEdges={design.diagram?.edges} /> : <DesignSections report={design.report} />}</div></>}</main></div>;
}
