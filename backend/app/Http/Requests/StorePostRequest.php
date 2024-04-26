<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fk_user_id'  => 'required|exists:users,id',
            'content'     => 'required|string|max:300',
            'coordinates' => 'required'
        ];
    }
}
