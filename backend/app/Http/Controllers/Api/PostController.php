<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\NearbyPostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    public function index()
    {
        return PostResource::collection(
            Post::query()->orderBy('created_at', 'desc')->paginate(25)
        );
    }

    public function getNearbyPosts(NearbyPostRequest $request)
    {
        $data = $request->validated();
        
        $latitude  = $data['latitude'];
        $longitude = $data['longitude'];
        $radius    = $data['radius'];

        $nearbyPosts = Post::selectRaw("id, fk_user_id, content, created_at,
                        ( 6371 * acos( cos( radians(?) ) *
                           cos( radians( latitude ) )
                           * cos( radians( longitude ) - radians(?)
                           ) + sin( radians(?) ) *
                           sin( radians( latitude ) ) )
                        ) AS distance", [$latitude, $longitude, $latitude])
            ->having('distance', '<=', $radius)
            ->orderBy('created_at','desc')
            ->paginate(25);
        
        // Do something to count and try again with increased radius if there are too few posts in the area.
        // Probably don't even need radius in the request. Just start with 1 km and increase by 1 and try again
        // until there either a max radius or post amount is found.

        return PostResource::collection(
            $nearbyPosts
        );
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

        Post::create([
            'fk_user_id' => $data['user_id'],
            'content'    => $data['content'],
            'latitude'   => $data['latitude'],
            'longitude'  => $data['longitude'],
        ]);

        return response(
            ['success' => true],
            201
        );
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
