<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NearbyPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'latitude'  => 'required|decimal:2,7',
            'longitude' => 'required|decimal:2,7',
            'radius'    => 'required|integer',
        ];
    }
}
