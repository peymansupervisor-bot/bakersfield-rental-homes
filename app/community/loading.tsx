export default function CommunityLoading() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gray-200" />
              <div className="space-y-1.5">
                <div className="h-3 w-28 bg-gray-200 rounded" />
                <div className="h-2.5 w-16 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-full bg-gray-100 rounded mb-1" />
            <div className="h-3 w-5/6 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
