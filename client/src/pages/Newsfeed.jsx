import { useState } from "react";
import useAuth from "../hooks/useAuth";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";

export default function Newsfeed() {
  const { user, logout } = useAuth();
  const [newPost, setNewPost] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gray-900 text-white grid place-items-center text-xs font-semibold">
                MS
              </div>
              <h1 className="text-base font-semibold tracking-tight text-gray-900">
                Newsfeed
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-gray-600">
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <CreatePost onPostCreated={setNewPost} />
        <div className="mt-4">
          <PostList newPost={newPost} />
        </div>
      </main>
    </div>
  );
}
