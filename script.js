
const chatDiv = document.getElementById('chat');

async function sendMessage() {
  const input = document.getElementById('userInput');
  const userText = input.value.trim();
  if (!userText) return;

  chatDiv.innerHTML += `<div class="msg user">You: ${userText}</div>`;
  input.value = '';

  const response = await fetch('/.netlify/functions/chatgpt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userText })
  });

  const data = await response.json();
  const botReply = data.reply;

  chatDiv.innerHTML += `<div class="msg bot">Bot: ${botReply}</div>`;
  chatDiv.scrollTop = chatDiv.scrollHeight;
}
