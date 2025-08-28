<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
// use App\Models\Comment;

class LikeController extends Controller
{
    public function store(Post $post, Request $request)
    {
        $post->likes()->firstOrCreate([
            'user_id' => $request->user()->id,
        ]);

        return response()->json(['message' => 'Liked']);
    }

    public function destroy(Post $post, Request $request)
    {
        $post->likes()->where('user_id', $request->user()->id)->delete();
        return response()->json(['message' => 'Unliked']);
    }
}
