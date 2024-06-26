<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'user_id'    => $this->fk_user_id,
            'content'    => $this->content,
            'created_at' => $this->created_at->diffForHumans(),
            'score'      => (int) $this->votes,
            'distance'   => $this->formatDistance($this->distance),
            'replies'    => ReplyResource::collection($this->replies),
        ];
    }

    private function formatDistance(float $distance): string
    {
        if ($distance < 1) {
            return '<1km away';
        }

        if ($distance > 10) {
            return '>10km away';
        }

        return '~' . round($distance) . 'km away';
    }
}
