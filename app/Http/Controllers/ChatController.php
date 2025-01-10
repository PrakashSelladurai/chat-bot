<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function sendMessage(Request $request)
    {
        $message = $request->input('message');
    
        // Set headers for SSE response
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');
        header('Connection: keep-alive');
    
        try {
            $response = $this->client->post(env('OPENAI_API_URL'), [
                'headers' => [
                    'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'gpt-3.5-turbo',
                    'messages' => [['role' => 'user', 'content' => $message]],
                    'stream' => true,
                ],
            ]);
    
            $stream = $response->getBody();
    
            while (!$stream->eof()) {
                $chunk = $stream->read(1024);
                
                if (!empty($chunk)) {
                    $lines = explode("\n", $chunk);
    
                    foreach ($lines as $line) {
                        if (trim($line) === '') {
                            continue; // Skip empty lines
                        }
    
                        if (str_starts_with($line, 'data: ')) {
                            $jsonData = substr($line, 6);
                            $decodedChunk = json_decode($jsonData, true);
    
                            if (isset($decodedChunk['choices'][0]['delta']['content'])) {
                                $content = $decodedChunk['choices'][0]['delta']['content'];
    
                                echo "data: " . json_encode(['content' => $content]) . "\n\n";
                                ob_flush();
                                flush();
                            }
                        }
                    }
                }
            }
    
            echo "data: [DONE]\n\n";
            ob_flush();
            flush();
    
        } catch (\Exception $e) {
            Log::error('Error during streaming', ['message' => $e->getMessage()]);
    
            echo "data: " . json_encode(['error' => 'An error occurred while processing your request.']) . "\n\n";
            ob_flush();
            flush();
        }
    }
    
}
