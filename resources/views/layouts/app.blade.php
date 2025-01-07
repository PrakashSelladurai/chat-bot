<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Chat-Bot Conversation')</title>
    <!-- Add CSS -->
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>
<body>
    <div class="chat-container">
        @yield('content')  <!-- This is where child views will inject their content -->
    </div>

    <!-- Include JavaScript -->
    <script src="{{ asset('js/chat.js') }}"></script>
</body>
</html>
