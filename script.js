const chatDiv = document.getElementById('chat');
const userInput = document.getElementById('userInput');

// Send message when the button is clicked
function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;

  chatDiv.innerHTML += `<div class="msg user">You: ${userText}</div>`;
  userInput.value = '';

  fetch('/.netlify/functions/chatgpt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userText })
  })
    .then(response => response.json())
    .then(data => {
      const botReply = data.reply;
      chatDiv.innerHTML += `<div class="msg bot">Bot: ${botReply}</div>`;
      chatDiv.scrollTop = chatDiv.scrollHeight;
    })
    .catch(error => {
      chatDiv.innerHTML += `<div class="msg bot">Bot: Error - ${error.message}</div>`;
    });
}

// Allow pressing Enter key to send message
userInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission or new line
    sendMessage();
  }
});
