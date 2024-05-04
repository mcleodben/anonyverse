<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::factory()->create([
            'fk_user_id' => 1,
            'content'    => 'Test post from seeder',
            'latitude'   => 53.2185088,
            'longitude'  => -2.8737536,
        ]);
    }
}
