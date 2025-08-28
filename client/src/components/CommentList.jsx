export default function CommentList({ comments }) {
  // Helper to format date/time, e.g. "Aug 28, 2025, 08:30 AM"
  function formatDateTime(dt) {
    if (!dt) return "";
    const date = new Date(dt);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div className="mt-3 space-y-2">
      {comments.length > 0 && (
        <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
          Comments
        </div>
      )}
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <div className="mt-1 h-7 w-7 flex-none rounded-full bg-gray-200 text-center text-xs font-semibold leading-7 text-gray-700">
            {comment.user?.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <div className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">
                {comment.user?.name || "Unknown"}
              </span>
              <span className="text-xs text-gray-400 ml-2">
                {formatDateTime(comment.created_at)}
              </span>
            </div>
            <div className="text-sm text-gray-800">{comment.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
