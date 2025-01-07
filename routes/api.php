<?php

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use Symfony\Component\HttpFoundation\StreamedResponse;


Route::get('/user-message',[ChatController::class, 'sendMessage']);
// Route::get('/user-message', function (Request $request) {
//     $message =request('message');
//     if($message == "hello")
//     {
//         $chunks = [
//             "Hello, ",
//             "how can I ",
//             "help you today?",
//         ];
//     }else{
//         $chunks = [
//             "The sun set behind the mountains",
//             "casting a warm golden glow across the horizon",
//             "while birds soared gracefully above the trees", 
//             "singing songs of freedom. In the distance", 
//             "the sound of a flowing river echoed through the valley", 
//             "bringing peace to the tranquil landscape as day faded into night."
//         ];
//     }

//     return new StreamedResponse(function () use ($chunks) {
//         foreach ($chunks as $chunk) {
//             echo "data: " . $chunk . "\n\n"; 
//             ob_flush();
//             flush();
//             sleep(1); // Simulate delay between chunks
//         }
//         echo "data: [END]\n\n"; // Signal end of response
//     }, 200, [
//         'Content-Type'  => 'text/event-stream',
//         'Cache-Control' => 'no-cache',
//         'Connection'    => 'keep-alive',
//     ]);
// });