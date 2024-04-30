<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReplyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'user_id'    => $this->fk_user_id,
            'post_id'    => $this->fk_post_id,
            'content'    => $this->content,
            'created_at' => $this->created_at->diffForHumans(),
            'score'      => (int) $this->votes,
        ];
    }
}
