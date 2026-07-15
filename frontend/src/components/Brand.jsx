import { Boxes } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Brand({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-3 font-semibold tracking-tight text-white">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300 shadow-glow"><Boxes size={21} /></span>
      {!compact && <span>System Design <span className="text-cyan-300">AI</span></span>}
    </Link>
  );
}
