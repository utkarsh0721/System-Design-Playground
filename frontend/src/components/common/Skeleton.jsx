export default function Skeleton({ className = '' }) { return <div className={`animate-pulse rounded-xl bg-white/[.06] ${className}`} />; }
export function CardSkeleton() { return <div className="glass rounded-2xl p-5"><Skeleton className="h-5 w-1/3" /><Skeleton className="mt-8 h-6 w-4/5" /><Skeleton className="mt-3 h-4 w-1/2" /></div>; }
