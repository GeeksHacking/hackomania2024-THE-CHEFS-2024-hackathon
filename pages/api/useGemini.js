const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(`AIzaSyDBrsK6EHTWwg5fC16cbIVCF5S0SJ2Tz3c`);

// Exported function to generate content based on a supplied prompt
export default async function generateContent(prompt) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text; // Returning the generated text
}

// Usage example (you can comment this out or delete it when using the function in your project):
// const story = await generateContent("Write a story about a magic backpack.");
// console.log(story);
