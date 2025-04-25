// src/utils/geminiApi.js

// Note: In a production environment, you should store your API keys securely
// and not expose them in client-side code. Use environment variables and a backend API.
const API_KEY = "AIzaSyBAK0-mNxEM51Frxj879jCndfXFPKXp6WU";

export async function generateCaptionWithGemini(platform, context) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
  
  const contextText = context ? ` with context: "${context}"` : "";
  
  const prompt = `Generate a creative and engaging caption for a ${platform} post${contextText}. 
  The caption should match the typical style, tone, and length appropriate for ${platform}.
  ${platform === "Twitter" ? "Keep it under 280 characters." : ""}
  ${platform === "Instagram" ? "Include relevant hashtags." : ""}
  ${platform === "LinkedIn" ? "Keep it professional and business-oriented." : ""}
  ${platform === "Facebook" ? "Make it conversational and engaging." : ""}
  ${platform === "YouTube" ? "Include a call-to-action for likes, comments, and subscriptions." : ""}`;
  
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}