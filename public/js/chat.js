// document.addEventListener('DOMContentLoaded', function () {
//     const chatLog = document.getElementById('chatLog');
//     const sendBtn = document.getElementById('sendBtn');
//     const userInput = document.getElementById('userInput');

//     // Initial scroll position at the bottom
//     scrollToBottom();

//     // Sending message
//     sendBtn.addEventListener('click', sendMessage);
//     userInput.addEventListener('keypress', function (e) {
//         if (e.key === 'Enter') sendMessage(); // Allow pressing Enter to send the message
//     });

//     function sendMessage() {
//         const message = userInput.value.trim();
//         if (!message) return;

//         // Display user message
//         chatLog.innerHTML += `<div class="chat-message user-message">${message}</div>`;
//         scrollToBottom();

//         // Clear input field
//         userInput.value = '';

//         // Simulate typing indicator
//         showTypingIndicator();

//         // Start streaming bot response after delay
//         setTimeout(function () {
//             startStreamingResponse(message);
//         }, 1500); // Simulate typing delay
//     }

//     // Show typing indicator
//     function showTypingIndicator() {
//         const typingIndicator = `<div class="chat-message bot-message typing-indicator">...</div>`;
//         chatLog.innerHTML += typingIndicator;
//         scrollToBottom();
//     }

//     // Simulate incremental streaming and show the bot response in order
//     function startStreamingResponse(userMessage) {
//         // Remove typing indicator
//         const typingIndicator = document.querySelector('.typing-indicator');
//         if (typingIndicator) typingIndicator.remove();

//         // Simulate streaming using EventSource (you can replace with actual backend endpoint)
//         const eventSource = new EventSource(`/api/user-message?message=${encodeURIComponent(userMessage)}`);
//         let botResponse = '';
//         let charIndex = 0;

//         // Create a new bot message element
//         const newBotMessageDiv = document.createElement('div');
//         newBotMessageDiv.classList.add('chat-message', 'bot-message');
//         newBotMessageDiv.innerText = ''; // Start with an empty message
//         chatLog.appendChild(newBotMessageDiv); // Add it to the chat log

//         // Streaming function to simulate incremental character-by-character display
//         function incrementallyDisplayResponse() {
//             if (charIndex < botResponse.length) {
//                 // Update the new bot message with characters incrementally
//                 newBotMessageDiv.innerText = botResponse.substring(0, charIndex + 1);
//                 charIndex++;
//                 scrollToBottom();
//                 setTimeout(incrementallyDisplayResponse, 50); // Adjust speed of character display
//             }
//         }

//         eventSource.onmessage = function (event) {
//             if (event.data === '[END]') {
//                 eventSource.close();
//                 return;
//             }

//             botResponse += event.data; // Concatenate chunks into a full response
//             incrementallyDisplayResponse(); // Start showing response one character at a time
//         };

//         eventSource.onerror = function () {
//             console.error('Error occurred while streaming.');
//             eventSource.close();
//         };
//     }

//     // Scroll chat log to the bottom
//     function scrollToBottom() {
//         chatLog.scrollTop = chatLog.scrollHeight;
//     }
// });
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

        // Start streaming bot response after delay
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

    // Simulate incremental streaming and show the bot response in order
    function startStreamingResponse(userMessage) {
        // Remove typing indicator
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) typingIndicator.remove();

        // Simulate streaming using EventSource (you can replace with actual backend endpoint)
        const eventSource = new EventSource(`/api/user-message?message=${encodeURIComponent(userMessage)}`);
        let botResponse = '';
        let charIndex = 0;

        // Create a new bot message element
        const newBotMessageDiv = document.createElement('div');
        newBotMessageDiv.classList.add('chat-message', 'bot-message');
        newBotMessageDiv.innerText = ''; // Start with an empty message
        chatLog.appendChild(newBotMessageDiv); // Add it to the chat log

        // Streaming function to simulate incremental character-by-character display
        function incrementallyDisplayResponse() {
            if (charIndex < botResponse.length) {
                // Update the new bot message with characters incrementally
                newBotMessageDiv.innerText = botResponse.substring(0, charIndex + 1);
                charIndex++;
                scrollToBottom();
                setTimeout(incrementallyDisplayResponse, 50); // Adjust speed of character display
            }
        }

        eventSource.onmessage = function (event) {
            if (event.data === '[END]') {
                eventSource.close();
                return;
            }

            // Append the received chunk data to the bot response
            botResponse += event.data;
            incrementallyDisplayResponse(); // Start showing response one character at a time
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