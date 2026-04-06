
import { getGroqClient } from "../config/chatbot.js";


export const shoppingBot = async (req, res) => {
  const userMessage = req.body.message;

  // only allow shopping-related queries
  const shoppingKeywords = ["buy", "product", "shop", "price", "order", "cart", "discount", "phone", "mobile", "laptop", "clothing", "electronics", "grocery", "fashion", "accessories"];
  const isShoppingQuery = shoppingKeywords.some(keyword =>
    userMessage.toLowerCase().includes(keyword)
  );

  if (!isShoppingQuery) {
    return res.json({
      success: false,
      message: "This bot only handles shopping queries. Try asking about products, prices, or shops."
    });
  }

  try {
    const groqClient = getGroqClient();
    const response = await groqClient.chat.completions.create({
          model: "llama-3.1-8b-instant", 
      messages: [
        { role: "system", content: "You are a shopping assistant. Only answer shopping-related queries." },
        { role: "user", content: userMessage }
      ]
    });

    res.json({
      success: true,
      reply: response.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error contacting Groq API",
      error: error.message
    });
  }
};
