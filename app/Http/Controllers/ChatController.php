<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use App\Services\ChatGPTService;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    protected $chatGPT;

    public function __construct(ChatGPTService $chatGPT)
    {
        $this->chatGPT = $chatGPT;
    }

    public function sendMessage(Request $request)
    {
        Log::info('sendMessage Init');
        $userMessage = $request->input('message');
        $response = $this->chatGPT->sendMessage($userMessage);

        $conversation = Conversation::create([
            'user_message' => $userMessage,
            'response' => $response,
        ]);

        return response()->json($response);
    }
}
