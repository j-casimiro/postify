<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // public, paginated
    public function index(Request $request)
    {
        // Support optional auth on this public route by checking Sanctum guard explicitly
        $authenticatedUser = $request->user() ?: auth('sanctum')->user();
        $userId = $authenticatedUser->id ?? null;

        $posts = Post::with([
            'user:id,name',
            'comments' => function ($q) {
                $q->latest()->with('user:id,name');
            },
        ])
            ->withCount('likes') // automatically adds likes_count
            ->when($userId, function ($query) use ($userId) {
                // Add liked_by_user as a subquery
                $query->withExists(['likes as liked_by_user' => function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                }]);
            })
            ->latest()
            ->paginate(10);

        return $posts;
    }

    // protected
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string'
        ]);

        $post = $request->user()->posts()->create($data);
        return $post->load('user:id,name');
    }

    // protected + policy
    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'body' => 'sometimes|string'
        ]);

        $post->update($data);
        return $post->load('user:id,name');
    }

    // protected + policy
    public function destroy(Request $request, Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        return response()->noContent();
    }
}
