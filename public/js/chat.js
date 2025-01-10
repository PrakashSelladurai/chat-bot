    document.addEventListener('DOMContentLoaded', function () {
    const chatLog = document.getElementById('chatLog');
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');

    // Initial scroll position at the bottom
    scrollToBottom();

    // Sending message
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage(); // Allow pressing Enter to send the message
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Display user message
        chatLog.innerHTML += `<div class="chat-message user-message">${message}</div>`;
        scrollToBottom();

        // Clear input field
        userInput.value = '';

        // Simulate typing indicator
        showTypingIndicator();

        // Start streaming bot response after a delay
        setTimeout(function () {
            startStreamingResponse(message);
        }, 1500); // Simulate typing delay
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingIndicator = `<div class="chat-message bot-message typing-indicator">...</div>`;
        chatLog.innerHTML += typingIndicator;
        scrollToBottom();
    }

    // Start incremental streaming response
    function startStreamingResponse(userMessage) {
        // Remove typing indicator
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) typingIndicator.remove();

        // Simulate streaming using EventSource (replace with actual backend endpoint)
        const eventSource = new EventSource(`/api/chat/send-message?message=${encodeURIComponent(userMessage)}`);
        let botResponse = '';

        // Create a new bot message element
        const newBotMessageDiv = document.createElement('div');
        newBotMessageDiv.classList.add('chat-message', 'bot-message');
        newBotMessageDiv.innerText = ''; // Start with an empty message
        chatLog.appendChild(newBotMessageDiv); // Add it to the chat log

        eventSource.onmessage = function (event) {
            if (event.data === '[DONE]') {
                eventSource.close();
                return;
            }

            // Parse the chunk data
            try {
                const parsedData = JSON.parse(event.data);
                if (parsedData.content) {
                    // Incrementally append content to the bot message
                    botResponse += parsedData.content;
                    newBotMessageDiv.innerText = botResponse;
                    scrollToBottom();
                }
            } catch (error) {
                console.error('Error parsing stream data:', error);
            }
        };

        eventSource.onerror = function () {
            console.error('Error occurred while streaming.');
            eventSource.close();
        };
    }

    // Scroll chat log to the bottom
    function scrollToBottom() {
        chatLog.scrollTop = chatLog.scrollHeight;
    }
});
