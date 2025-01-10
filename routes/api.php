<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;


Route::get('/chat/send-message',[ChatController::class, 'sendMessage']);