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

    // Return everything for debugging
    return {
      statusCode: 200,
      body: JSON.stringify({
        fullApiResponse: data,
        choicesExists: !!data.choices,
        firstChoice: data.choices && data.choices[0],
        botReply: data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: `Server error: ${error.message}` })
    };
  }
};
