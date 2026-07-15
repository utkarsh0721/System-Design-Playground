import { ChevronDown, FileJson, FileText, Image, LoaderCircle, Share } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { exportJSON, exportMarkdown, exportPDF, exportPNG } from '../../utils/exporters';

const formats = [
  { id: 'pdf', label: 'PDF report', description: 'Diagram and complete report', icon: FileText },
  { id: 'png', label: 'PNG diagram', description: 'High-resolution canvas image', icon: Image },
  { id: 'json', label: 'JSON data', description: 'Portable structured design', icon: FileJson },
  { id: 'markdown', label: 'Markdown', description: 'Documentation-ready report', icon: Share },
];

export default function ExportMenu({ design, canvasElementId = 'architecture-canvas-export' }) {
  const [open, setOpen] = useState(false); const [active, setActive] = useState(''); const wrapper = useRef();
  useEffect(() => { const close = (event) => { if (!wrapper.current?.contains(event.target)) setOpen(false); }; document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close); }, []);
  const run = async (format) => { setActive(format); try { if (format === 'pdf') await exportPDF(design, canvasElementId); if (format === 'png') await exportPNG(design, canvasElementId); if (format === 'json') exportJSON(design); if (format === 'markdown') exportMarkdown(design); toast.success(`${format.toUpperCase()} export ready`); setOpen(false); } catch (error) { toast.error(error.message || 'Export failed'); } finally { setActive(''); } };
  return <div ref={wrapper} className="relative"><button onClick={() => setOpen(!open)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10" aria-haspopup="menu" aria-expanded={open}><FileText size={15} />Export <ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} /></button>{open && <div role="menu" className="absolute right-0 top-full z-40 mt-2 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f18]/95 p-2 shadow-2xl backdrop-blur-xl">{formats.map(({ id, label, description, icon: Icon }) => <button role="menuitem" key={id} disabled={Boolean(active)} onClick={() => run(id)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/5 disabled:opacity-50"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300">{active === id ? <LoaderCircle size={17} className="animate-spin" /> : <Icon size={17} />}</span><span><span className="block text-sm font-medium text-slate-200">{label}</span><span className="mt-0.5 block text-[11px] text-slate-600">{description}</span></span></button>)}</div>}</div>;
}
