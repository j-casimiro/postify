import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function PostCard({ post, onLikeToggled, disabled }) {
  const [comments, setComments] = useState(post.comments || []);

  useEffect(() => {
    setComments(post.comments || []);
  }, [post.comments]);

  const toggleLike = () => {
    if (disabled) return;
    const nextLiked = !Boolean(post.liked_by_user);
    onLikeToggled(post.id, nextLiked);
  };

  const addComment = (comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-4">
        <p className="text-sm text-gray-500">Posted by {post.user.name}</p>
        <p className="text-base font-semibold text-gray-900">{post.title}</p>
        <p className="mt-1 text-sm text-gray-700">{post.body}</p>
      </div>

      <div className="flex items-center gap-3 p-4">
        <button
          onClick={toggleLike}
          disabled={disabled}
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition-colors ${
            post.liked_by_user
              ? "border-gray-800 bg-gray-900 text-white"
              : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <span>👍</span>
          <span>{post.likes_count ?? 0}</span>
        </button>
      </div>

      <div className="border-t border-gray-100 p-4">
        <CommentForm postId={post.id} onCommentAdded={addComment} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}
