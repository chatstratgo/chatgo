const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
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
        model: "gpt-4-turbo",  // Switched to GPT-4-turbo
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    const botReply = data.choices && data.choices.length > 0
      ? data.choices[0].message.content
      : `Error: ${JSON.stringify(data)}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: botReply })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: `Server error: ${error.message}` })
    };
  }
};
