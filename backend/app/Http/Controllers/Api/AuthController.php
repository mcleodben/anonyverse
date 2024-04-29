<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    private const CODE_SUCCESS            = 200;
    private const CODE_SUCCESS_NO_CONTENT = 204;
    private const CODE_ERROR              = 400;
    
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response(
                [
                    'message' => 'Email or password is incorrect.'
                ],
                self::CODE_ERROR
            );
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(
            ['user' => $user, 'token' => $token],
            Response::HTTP_OK
        );
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'username' => $data['username'],
            'email'    => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(
            ['user' => $user, 'token' => $token],
            Response::HTTP_CREATED
        );
    }

    public function logout()
    {
        /** @var User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete;

        return response('', Response::HTTP_NO_CONTENT);
    }
}
