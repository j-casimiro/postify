<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;

class CommentController extends Controller
{

    public function store(Request $request, Post $post)
    {
        $request->validate(['content' => 'required|string']);

        $comment = $post->comments()->create([
            'content' => $request->content,
            'user_id' => $request->user()->id,
        ]);

        // Return the comment with user info for immediate UI rendering
        return response()->json($comment->load('user:id,name'), 201);
    }

    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete();
        return response()->noContent();
    }
}
