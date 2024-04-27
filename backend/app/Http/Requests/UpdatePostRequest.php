<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id'   => 'required|exists:users,id',
            'content'   => 'required|string|max:300',
            'latitude'  => 'required|decimal:2,7',
            'longitude' => 'required|decimal:2,7',
        ];
    }
}
