import { motion } from 'framer-motion';
import { ArrowRight, Binary, GitBranch, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-20 text-center lg:px-8 lg:pt-28">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-xs font-medium text-cyan-200"><Sparkles size={14} /> AI architecture workspace for developers</span>
        <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-bold leading-[1.04] tracking-[-.04em] text-white sm:text-6xl lg:text-8xl">Design Systems Like <span className="gradient-text">FAANG Engineers</span></h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">Learn system design interactively using AI-powered architecture generation.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3.5 font-semibold text-slate-950 shadow-glow transition hover:-translate-y-0.5 hover:brightness-110">Start Designing <ArrowRight size={18} /></Link><Link to="/app/templates" className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10">Explore Examples</Link></div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .25, duration: .7 }} className="glass relative mx-auto mt-20 max-w-5xl overflow-hidden rounded-3xl p-3 text-left">
        <div className="rounded-2xl border border-white/5 bg-[#080b12] p-5 sm:p-8"><div className="mb-8 flex items-center justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-cyan-300">Architecture canvas</p><h2 className="mt-2 text-xl font-semibold">Global video platform</h2></div><GitBranch className="text-violet-300" /></div><div className="grid gap-3 sm:grid-cols-3"><Preview icon={Binary} title="API Gateway" tone="cyan" /><Preview icon={GitBranch} title="Core Services" tone="violet" /><Preview icon={BoxesIcon} title="Data Layer" tone="blue" /></div></div>
      </motion.div>
    </section>
  );
}

function BoxesIcon(props) { return <Binary {...props} />; }
function Preview({ icon: Icon, title, tone }) { const tones = { cyan: 'border-cyan-300/20 bg-cyan-300/5 text-cyan-200', violet: 'border-violet-300/20 bg-violet-300/5 text-violet-200', blue: 'border-blue-300/20 bg-blue-300/5 text-blue-200' }; return <div className={`rounded-2xl border p-5 ${tones[tone]}`}><Icon size={20} /><p className="mt-7 text-sm font-medium">{title}</p><div className="mt-3 h-1.5 w-2/3 rounded-full bg-current opacity-20" /></div>; }
