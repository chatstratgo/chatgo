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
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    // Instead of just bot reply, return the entire data object
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: JSON.stringify(data, null, 2) })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: `Server error: ${error.message}` })
    };
  }
};
