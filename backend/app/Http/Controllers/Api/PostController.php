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

        // Perhaps find a more Laravel way to do this.
        $nearbyPosts = Post::selectRaw("id, fk_user_id, content, created_at,
                         ( 6371 * acos( cos( radians(?) ) *
                           cos( radians( latitude ) )
                           * cos( radians( longitude ) - radians(?)
                           ) + sin( radians(?) ) *
                           sin( radians( latitude ) ) )
                         ) AS distance", [$latitude, $longitude, $latitude])
            ->having('distance', '<=', $radius)
            ->orderBy('distance','desc')
            ->paginate(25);

        return PostResource::collection(
            $nearbyPosts
        );
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

        // How can this be done inside the model.
        $data['fk_user_id'] = $data['user_id'];
        unset($data['user_id']);

        $post = Post::create($data);

        return response(
            new PostResource($post),
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
