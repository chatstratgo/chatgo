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
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    // Check for error in API response
    if (data.error) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: `Error: ${data.error.message}` })
      };
    }

    // Check if choices exist and contain a message
    const botReply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
      ? data.choices[0].message.content
      : "I'm sorry, I couldn't generate a response for that. Could you try rephrasing?";

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
