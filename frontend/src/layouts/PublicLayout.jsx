import { Outlet } from 'react-router-dom';
import Brand from '../components/Brand';

export default function PublicLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <div className="grid-bg pointer-events-none absolute inset-0 animate-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 animate-float rounded-full bg-blue-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 animate-float rounded-full bg-violet-600/15 blur-3xl [animation-delay:-3s]" />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <Brand />
        <a href="/login" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10">Sign in</a>
      </header>
      <main className="relative z-10"><Outlet /></main>
    </div>
  );
}
