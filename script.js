const chatDiv = document.getElementById('chat');
const userInput = document.getElementById('userInput');

function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;

  chatDiv.innerHTML += `<div class="msg user">You: ${userText}</div>`;
  userInput.value = '';

  fetch('https://4f319a94-b601-4101-9491-688cb03a8cfd-00-pts3eyyfomjc.spock.replit.dev/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userText })
  })
    .then(response => response.json())
    .then(data => {
      console.log("API Response Data:", data);  // Add this for debugging
      const botReply = data.reply || "Sorry, I couldn't generate a response.";
      chatDiv.innerHTML += `<div class="msg bot">Bot: ${botReply}</div>`;
      chatDiv.scrollTop = chatDiv.scrollHeight;
    })
    .catch(error => {
      chatDiv.innerHTML += `<div class="msg bot">Bot: Error - ${error.message}</div>`;
    });
}

userInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});
