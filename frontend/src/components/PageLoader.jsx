export default function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas" role="status" aria-label="Loading page">
      <div className="relative h-12 w-12">
        <span className="absolute inset-0 rounded-full border border-cyan-300/20" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan-300" />
      </div>
    </div>
  );
}
