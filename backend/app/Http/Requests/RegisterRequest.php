<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => 'required|string|max:55',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|confirmed'
        ];
    }
}
