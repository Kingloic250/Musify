export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <div className="aspect-square skeleton" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-3 rounded-lg w-3/4" />
        <div className="skeleton h-2.5 rounded-lg w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <div className="skeleton w-8 h-4 rounded" />
      <div className="skeleton w-10 h-10 rounded" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 rounded w-1/3" />
        <div className="skeleton h-2.5 rounded w-1/4" />
      </div>
      <div className="skeleton h-2.5 w-10 rounded" />
    </div>
  );
}

export function SkeletonArtist() {
  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <div className="skeleton w-24 h-24 rounded-full" />
      <div className="skeleton h-3 w-3/4 rounded" />
      <div className="skeleton h-2.5 w-1/2 rounded" />
    </div>
  );
}

export function SkeletonBanner() {
  return <div className="skeleton w-full h-64 rounded-2xl" />;
}
