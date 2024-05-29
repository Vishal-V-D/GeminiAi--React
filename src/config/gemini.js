import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";  // Corrected import statement
  
  const apiKey = "google api key here";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  
  async function run(prompt) {
    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });
  
      // Debugging: Log the chat session and prompt
      console.log('Chat Session:', chatSession);
      console.log('Prompt:', prompt);
  
      const result = await chatSession.sendMessage(prompt);
      console.log('Result:', result);
      return result.response.text()
  
      // Ensure result.response.text is a function
      if (typeof result.response.text === 'function') {
        console.log(result.response.text());
      } else {
        console.error('Unexpected response format:', result.response);
      }
    } catch (error) {
      console.error('Error in run function:', error);
    }
  }
  
  export default run;
  
