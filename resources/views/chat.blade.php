@extends('layouts.app')

@section('title', 'Chat-Bot Conversation')

@section('content')
    <div class="chat-container">
        <div id="chatLog" class="chat-log">
        </div>
        <div class="input-area">
            <input type="text" id="userInput" placeholder="Type your message..." />
            <button id="sendBtn">Send</button>
        </div>
    </div>
@endsection
