import { LoaderCircle } from 'lucide-react';
export default function Button({ children, variant = 'primary', loading = false, className = '', ...props }) {
  const styles = { primary: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-glow hover:brightness-110', secondary: 'border border-white/10 bg-white/5 text-white hover:bg-white/10', danger: 'border border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/15', ghost: 'text-slate-300 hover:bg-white/5 hover:text-white' };
  return <button className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`} disabled={loading || props.disabled} {...props}>{loading && <LoaderCircle size={16} className="animate-spin" />}{children}</button>;
}
