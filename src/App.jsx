// src/App.jsx

import { useState } from "react";
import "./App.css";
import Caption from "./components/Caption";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-8 mt-8">
        Social Media Caption Generator
      </h1>
      <div className="w-full max-w-xl">
        <Caption />
      </div>
      <footer className="mt-16 text-center text-gray-500 text-sm">
        Built with React, Tailwind CSS, and Gemini API
      </footer>
    </div>
  );
}

export default App;