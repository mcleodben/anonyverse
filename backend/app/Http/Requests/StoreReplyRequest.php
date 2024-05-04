<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReplyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id'   => 'required|exists:users,id',
            'post_id'   => 'required|exists:posts,id',
            'content'   => 'required|string|max:300',
        ];
    }
}
