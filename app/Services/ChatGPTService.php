<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class ChatGPTService
{
    protected $client;

    public function __construct()
    {
        // Initialize the Guzzle client
        $this->client = new Client();
    }

    public function sendMessage(string $message)
    {
        // Initialize an empty string to store the response content
        $responseContent = '';

        Log::info('ChatGPTService:sendmsg');
        try {
            // Send the request using Guzzle
            $response = $this->client->post(env('OPENAI_API_URL'), [
                'headers' => [
                    'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'gpt-3.5-turbo', // Update model if necessary
                    'messages' => [['role' => 'user', 'content' => $message]],
                    'stream' => true,
                ],
            ]);

             // Read the response stream in chunks
            $response->getBody()->rewind();
            while (!$response->getBody()->eof()) {
                $chunk = $response->getBody()->read(2048); // Read in 2KB chunks
                $decodedChunk = json_decode($chunk, true);

                // If the chunk contains content, append it to the response content
                if (isset($decodedChunk['choices'][0]['delta']['content'])) {
                    $responseContent .= $decodedChunk['choices'][0]['delta']['content'];
                }
            }
            // Return the body of the response
            return $responseContent;
        } catch (RequestException $e) {
            // Handle errors, can log or return message
            return $e->getMessage();
        }
    }
}
