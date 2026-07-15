import { Copy, Edit3, Network, Save, Share2, Star, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { designApi } from '../api/designApi';
import Button from '../components/common/Button';
import ErrorState from '../components/common/ErrorState';
import PageHeader from '../components/common/PageHeader';
import Skeleton from '../components/common/Skeleton';
import ArchitectureCanvas from '../components/diagram/ArchitectureCanvas';
import ExportMenu from '../components/export/ExportMenu';
import DesignSections from '../components/design/DesignSections';

export default function DesignDetailPage() {
  const { designId } = useParams(); const navigate = useNavigate();
  const [design, setDesign] = useState(null); const [error, setError] = useState(''); const [tab, setTab] = useState('diagram');
  const [editing, setEditing] = useState(false); const [name, setName] = useState(''); const [nodes, setNodes] = useState([]); const [saving, setSaving] = useState(false);
  const load = useCallback(async () => { setError(''); try { const value = await designApi.get(designId); setDesign(value); setName(value.name); setNodes(value.diagram?.nodes || value.report?.diagram?.nodes || []); } catch (err) { setError(err.response?.data?.message || 'Unable to load architecture'); } }, [designId]);
  useEffect(() => { load(); }, [load]);
  const captureNodes = useCallback((value) => setNodes(value), []);
  const save = async (payload, success = 'Design updated') => { setSaving(true); try { const updated = await designApi.update(designId, payload); setDesign(updated); setName(updated.name); toast.success(success); } catch (err) { toast.error(err.response?.data?.message || 'Could not save changes'); } finally { setSaving(false); } };
  const rename = async () => { if (!name.trim()) return; await save({ name: name.trim() }, 'Design renamed'); setEditing(false); };
  const share = async () => { try { const result = await designApi.share(designId); const url = `${window.location.origin}/shared/${result.shareId}`; await navigator.clipboard.writeText(url); toast.success('Share link copied'); } catch { toast.error('Could not create share link'); } };
  const duplicate = async () => { try { const copy = await designApi.duplicate(designId); toast.success('Design duplicated'); navigate(`/app/designs/${copy._id}`); } catch { toast.error('Could not duplicate design'); } };
  const remove = async () => { if (!window.confirm(`Delete “${design.name}”?`)) return; try { await designApi.remove(designId); toast.success('Design deleted'); navigate('/app/designs'); } catch { toast.error('Could not delete design'); } };
  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!design) return <div><Skeleton className="h-10 w-80" /><Skeleton className="mt-8 h-[620px] w-full" /></div>;
  const edges = design.diagram?.edges || design.report?.diagram?.edges || [];
  return <div><PageHeader eyebrow={`${design.input?.architectureType || 'System'} · ${design.input?.expectedUsers || 'Custom scale'}`} title={editing ? <span className="flex items-center gap-2"><input autoFocus value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && rename()} className="max-w-lg border-b border-cyan-300/40 bg-transparent outline-none" /><button onClick={rename} className="text-cyan-300"><Save size={20} /></button></span> : design.name} description={design.report?.overview} actions={<><Button variant="secondary" onClick={() => setEditing(!editing)}><Edit3 size={15} />Rename</Button><Button variant="secondary" onClick={() => save({ nodes }, 'Canvas positions saved')} loading={saving}><Save size={15} />Save canvas</Button><Button variant="secondary" onClick={share}><Share2 size={15} />Share</Button><ExportMenu design={design} /></>} /><div className="mt-7 flex flex-wrap items-center gap-2 border-b border-white/10 pb-3"><Tab active={tab === 'diagram'} onClick={() => setTab('diagram')} icon={Network}>Diagram</Tab><Tab active={tab === 'report'} onClick={() => setTab('report')} icon={Copy}>Architecture report</Tab><div className="ml-auto flex gap-1"><button onClick={() => save({ isFavourite: !design.isFavourite }, design.isFavourite ? 'Removed from favourites' : 'Added to favourites')} className={`rounded-xl p-2.5 ${design.isFavourite ? 'text-amber-300' : 'text-slate-500 hover:bg-white/5'}`}><Star size={17} fill={design.isFavourite ? 'currentColor' : 'none'} /></button><button onClick={duplicate} className="rounded-xl p-2.5 text-slate-500 hover:bg-white/5 hover:text-white"><Copy size={17} /></button><button onClick={remove} className="rounded-xl p-2.5 text-slate-500 hover:bg-red-400/10 hover:text-red-300"><Trash2 size={17} /></button></div></div>{tab === 'diagram' ? <div className="mt-5"><ArchitectureCanvas initialNodes={design.diagram?.nodes || design.report?.diagram?.nodes} initialEdges={edges} onChange={captureNodes} /><p className="mt-3 text-xs text-slate-600">Drag nodes to reorganize. Click any node to open its engineering brief. Use “Save canvas” to persist positions.</p></div> : <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_280px]"><DesignSections report={design.report} /><aside className="h-fit rounded-2xl border border-white/10 bg-white/[.02] p-5 xl:sticky xl:top-24"><p className="text-xs uppercase tracking-widest text-cyan-300">Design input</p><dl className="mt-4 space-y-4 text-sm"><Meta label="Scale" value={design.input?.expectedUsers} /><Meta label="Traffic" value={design.input?.traffic} /><Meta label="Architecture" value={design.input?.architectureType} /><Meta label="Features" value={design.input?.features?.join(', ')} /></dl><Link to="/app/compare" className="mt-6 block text-sm text-violet-300">Compare this pattern →</Link></aside></div>}</div>;
}
function Tab({ active, onClick, icon: Icon, children }) { return <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${active ? 'bg-cyan-300/10 text-cyan-200' : 'text-slate-500 hover:text-white'}`}><Icon size={15} />{children}</button>; }
function Meta({ label, value }) { return <div><dt className="text-xs text-slate-600">{label}</dt><dd className="mt-1 leading-5 text-slate-300">{value || '—'}</dd></div>; }
