import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import PostCard from "./PostCard";
import useAuth from "../hooks/useAuth";

export default function PostList({ newPost }) {
  const [posts, setPosts] = useState([]);
  const [togglingLike, setTogglingLike] = useState({});
  const { token } = useAuth();

  const fetchPosts = useCallback(async () => {
    const res = await api.get("/posts");
    const normalized = (res.data.data || []).map((p) => ({
      ...p,
      likes_count:
        typeof p.likes_count === "number"
          ? p.likes_count
          : Number(p.likes_count || 0),
      liked_by_user: Boolean(p.liked_by_user),
    }));
    setPosts(normalized);
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (newPost) {
      const normalized = {
        ...newPost,
        likes_count:
          typeof newPost.likes_count === "number"
            ? newPost.likes_count
            : Number(newPost.likes_count || 0),
        liked_by_user: Boolean(newPost.liked_by_user),
      };
      setPosts((prevPosts) => [normalized, ...prevPosts]);
    }
  }, [newPost]);

  const handleLikeToggled = async (postId, nextLiked) => {
    setTogglingLike((prev) => ({ ...prev, [postId]: true }));
    // optimistic update
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked_by_user: nextLiked,
              likes_count: Math.max(
                0,
                (p.likes_count ?? 0) + (nextLiked ? 1 : -1)
              ),
            }
          : p
      )
    );

    try {
      if (nextLiked) {
        await api.post(`/posts/${postId}/like`);
      } else {
        await api.delete(`/posts/${postId}/like`);
      }
    } catch (err) {
      // revert on failure
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                liked_by_user: !nextLiked,
                likes_count: Math.max(
                  0,
                  (p.likes_count ?? 0) + (nextLiked ? -1 : 1)
                ),
              }
            : p
        )
      );
      console.error("Failed to toggle like:", err);
    } finally {
      setTogglingLike((prev) => ({ ...prev, [postId]: false }));
    }
  };

  return (
    <div>
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
          No posts yet. Be the first to share something.
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLikeToggled={handleLikeToggled}
            disabled={!!togglingLike[post.id]}
          />
        ))
      )}
    </div>
  );
}
