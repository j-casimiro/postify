import { useState } from "react";
import api from "../api/axios";

export default function CommentForm({ postId, onCommentAdded }) {
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    try {
      const res = await api.post(`/posts/${postId}/comments`, {
        content: body,
      });
      setBody("");
      onCommentAdded(res.data);
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2 flex items-center gap-2">
      <input
        type="text"
        className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
        placeholder="Write a comment..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition-colors"
      >
        Send
      </button>
    </form>
  );
}
