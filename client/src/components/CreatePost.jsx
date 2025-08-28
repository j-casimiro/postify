import { useState } from "react";
import api from "../api/axios";

export default function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim() || !title.trim()) return;
    const res = await api.post("/posts", { title, body });
    setTitle("");
    setBody("");
    onPostCreated(res.data);
  };

  const isDisabled = !title.trim() || !body.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          placeholder="Give your post a short title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 min-h-[96px]"
          placeholder="What's on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <button
          type="submit"
          disabled={isDisabled}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            isDisabled
              ? "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400"
              : "bg-gray-900 text-white hover:bg-black"
          }`}
        >
          Share
        </button>
      </div>
    </form>
  );
}
