// src/components/Caption.jsx

import { useState, useEffect } from "react";

const Caption = () => {
  const [platform, setPlatform] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");

  const platforms = [
    "Instagram",
    "Twitter",
    "LinkedIn",
    "Facebook",
    "YouTube",
  ];

  const tones = [
    "Professional",
    "Casual",
    "Witty",
    "Motivational",
    "Informative",
    "Humorous",
    "Formal",
    "Friendly"
  ];

  // Load API key from environment variables when component mounts
  useEffect(() => {
    setApiKey(import.meta.env.VITE_GEMINI_API_KEY);
  }, []);

  const generateCaption = async () => {
    if (!platform) {
      setError("Please select a platform");
      return;
    }

    if (!apiKey) {
      setError("API key is missing. Please set your Gemini API key.");
      return;
    }

    setError("");
    setLoading(true);
    setCaption("");

    try {
      const generatedCaption = await callGeminiApi();
      
      // Add slight delay to show loading state
      setTimeout(() => {
        setCaption(generatedCaption);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Error generating caption:", err);
      setError(`API Error: ${err.message}. Please check your API key and try again.`);
      setLoading(false);
    }
  };

  const callGeminiApi = async () => {
    // Updated API endpoint with the latest model name
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`;
    
    const contextText = context ? ` about "${context}"` : "";
    const toneText = tone ? ` The tone should be ${tone.toLowerCase()}.` : "";
    
    // Create a detailed prompt for the AI
    const prompt = `
      Generate a creative and original caption for a ${platform} post${contextText}.
      ${toneText}
      
      Specific requirements for ${platform}:
      ${platform === "Twitter" ? "- Keep it concise (under 280 characters)\n- Make it engaging and shareable" : ""}
      ${platform === "Instagram" ? "- Include 2-3 relevant hashtags at the end\n- Make it visually descriptive and appealing" : ""}
      ${platform === "LinkedIn" ? "- Keep it professional and business-oriented\n- Focus on value, insights, or professional development" : ""}
      ${platform === "Facebook" ? "- Make it conversational and relatable\n- Aim to generate engagement and comments" : ""}
      ${platform === "YouTube" ? "- Include a call-to-action (like, subscribe, comment)\n- Make it attention-grabbing" : ""}
      
      Important: Generate a completely unique and creative caption. Do not use templates or generic phrases.
    `;
    
    // Structure the request body
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 200,
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
      throw new Error("Invalid response format from API");
    }
    
    return data.candidates[0].content.parts[0].text.trim();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <label htmlFor="platform" className="block text-gray-700 font-medium mb-2">
          Select Platform
        </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
        >
          <option value="">-- Select a platform --</option>
          {platforms.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="tone" className="block text-gray-700 font-medium mb-2">
          Choose Tone (Optional)
        </label>
        <select
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
        >
          <option value="">-- Select a tone --</option>
          {tones.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="context" className="block text-gray-700 font-medium mb-2">
          Context or Idea (Optional)
        </label>
        <input
          type="text"
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="E.g., product launch, summer vacation, new book..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
        />
      </div>

      <button
        onClick={generateCaption}
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-300"
      >
        {loading ? "Generating..." : "Generate Caption"}
      </button>

      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

      {loading && (
        <div className="mt-6">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
          </div>
          <p className="text-center text-gray-500 mt-2">Crafting your perfect caption...</p>
        </div>
      )}

      {caption && !loading && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Your {platform} Caption
            {tone && <span className="font-normal text-gray-500"> ({tone} tone)</span>}:
          </h3>
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-gray-800 whitespace-pre-wrap">{caption}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                navigator.clipboard.writeText(caption);
              }}
              className="text-purple-600 hover:text-purple-800 text-sm flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy to clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Caption;