<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function testCreatePost(): void
    {
        $user = User::factory()->create();

        $payload = [
            'user_id'   => 1,
            'content'   => 'Testing create post',
            'latitude'  => 53.2185088,
            'longitude' => -2.8737536,
        ];

        $response = $this->actingAs($user)->post('/api/create-post', $payload, ['Accept' => 'application/json']);

        $response->assertStatus(Response::HTTP_CREATED);

        $this->assertDatabaseHas('posts', [
            'fk_user_id' => 1,
            'content'    => 'Testing create post',
            'latitude'   => 53.2185088,
            'longitude'  => -2.8737536,
        ]);
    }

    // SQLite doesn't support acos. Perhaps set up a different local testing db.

    // public function testGetNearbyPosts()
    // {
    //     $payload = [
    //         'latitude'  => 53.2185088,
    //         'longitude' => -2.8737536,
    //         'radius'    => 10,
    //     ];

    //     $response = $this->post('/api/nearby-posts', $payload);

    //     $response->assertStatus(Response::HTTP_OK);
    // }
}
