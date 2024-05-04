<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReplyTest extends TestCase
{
    use RefreshDatabase;

    public function testCreateReply(): void
    {
        $user = User::factory()->create();

        Post::factory()->create();

        $payload = [
            'user_id' => 1,
            'post_id' => 1,
            'content' => 'Testing create reply',
        ];

        $response = $this->actingAs($user)->post('/api/create-reply', $payload, ['Accept' => 'application/json']);

        $response->assertStatus(Response::HTTP_CREATED);

        $this->assertDatabaseHas('replies', [
            'fk_user_id' => 1,
            'fk_post_id' => 1,
            'content'    => 'Testing create reply',
        ]);
    }
}
