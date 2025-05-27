const fetch = require('node-fetch');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const userMessage = body.message;

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();

  // Check if the response has choices and the message content
  const botReply = data.choices && data.choices.length > 0
    ? data.choices[0].message.content
    : "I'm not sure how to respond.";

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: botReply })
  };
};
