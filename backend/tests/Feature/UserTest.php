<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testUserIsCreatedSuccessfully() {
    
        $payload = [
            'username'              => 'Name',
            'email'                 => 'test@email.com',
            'password'              => 'testing123',
            'password_confirmation' => 'testing123',
        ];

        $this->json('post', 'api/register', $payload)
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure(
                [
                    'user' => [
                        'id',
                        'username',
                        'email',
                        'created_at',
                    ]
                ]
            );

        $this->assertDatabaseHas('users', [
            'username' => 'Name',
            'email'    => 'test@email.com',
        ]);
    }
}
