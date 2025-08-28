<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // public, paginated
    public function index(Request $request)
    {
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

    // protected + policy
    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            abort(401, 'Unauthorized');
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string'
        ]);

        // Create a new Post instance for authorization check
        $post = new Post($data);
        $post->user_id = $user->id;

        $this->authorize('create', $post);

        $post = $user->posts()->create($data);
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
