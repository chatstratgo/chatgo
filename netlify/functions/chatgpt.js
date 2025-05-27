const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    console.log("Received event:", event);  // Log the event itself

    const body = JSON.parse(event.body);
    const userMessage = body.message;
    console.log("User message:", userMessage);  // Log the user's message

    const apiKey = process.env.OPENAI_API_KEY;
    console.log("API Key:", apiKey ? "Exists" : "Missing");  // Check if key exists

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
    console.log("OpenAI API response:", JSON.stringify(data));  // Log the response

    const botReply = data.choices && data.choices.length > 0
      ? data.choices[0].message.content
      : `Error: ${JSON.stringify(data)}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: botReply })
    };

  } catch (error) {
    console.error("Error in chatbot function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: `Server error: ${error.message}` })
    };
  }
};
