export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 h-12 w-3/4 rounded bg-gray-200"></div>
        <div className="mb-4 flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-6 w-20 rounded-full bg-gray-200"></div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-6 w-full rounded bg-gray-200"></div>
          ))}
        </div>
      </div>
      <div className="mb-8 h-[400px] w-full rounded-lg bg-gray-200"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-4 w-full rounded bg-gray-200"></div>
        ))}
      </div>
    </div>
  );
}
