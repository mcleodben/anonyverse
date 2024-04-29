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
        ];
    }

    private function formatDistance(float $distance): string
    {
        // Sort this mess out
        $distanceInKm = $distance * 1000;

        if ($distanceInKm < 1) {
            return 'Less than 1km away';
        }

        if ($distanceInKm < 2) {
            return '~2km away';
        }

        if ($distanceInKm < 3) {
            return '~3km away';
        }

        if ($distanceInKm < 4) {
            return '~4km away';
        }

        if ($distanceInKm < 5) {
            return '~5km away';
        }

        return '~7km away';
    }
}
