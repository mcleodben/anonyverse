<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    public function definition(): array
    {
        return [
            'fk_user_id' => $this->faker->unique()->numberBetween(1, User::count()),
            'content'    => $this->faker->text(),
            'latitude'   => $this->faker->latitude(),
            'longitude'  => $this->faker->longitude(),
            'created_at' => now(),
        ];
    }
}
