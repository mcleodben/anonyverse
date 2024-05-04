<?php

namespace App\Http\Controllers\Api;

use App\Models\Reply;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReplyRequest;

class ReplyController extends Controller
{
    public function index()
    {
        //
    }

    public function store(StoreReplyRequest $request)
    {
        $data = $request->validated();

        Reply::create([
            'fk_user_id' => $data['user_id'],
            'fk_post_id' => $data['post_id'],
            'content'    => $data['content'],
        ]);

        return response(
            ['success' => true],
            201
        );
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
