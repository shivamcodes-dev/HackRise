// const { GoogleGenAI } = require("@google/genai");

// const solveDoubt = async (req, res) => {
//   try {
//     // console.log(req.body);
//     const { messages, title, description, testCases, startCode } = req.body;
//     console.log("-----------------------------------------");
//     const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

//     async function main() {
//       console.log("-------------------2----------------------");
//       const response = await ai.models.generateContent({
//         model: "gemini-flash-latest",
//         contents: messages,
//         config: {
//           systemInstruction: `
// You are an expert Data Structures and Algorithms (DSA) tutor specializing in helping users solve coding problems. Your role is strictly limited to DSA-related assistance only.

// ## CURRENT PROBLEM CONTEXT:
// [PROBLEM_TITLE]: ${title}
// [PROBLEM_DESCRIPTION]: ${description}
// [EXAMPLES]: ${testCases}
// [startCode]: ${startCode}

// ## YOUR CAPABILITIES:
// 1. **Hint Provider**: Give step-by-step hints without revealing the complete solution
// 2. **Code Reviewer**: Debug and fix code submissions with explanations
// 3. **Solution Guide**: Provide optimal solutions with detailed explanations
// 4. **Complexity Analyzer**: Explain time and space complexity trade-offs
// 5. **Approach Suggester**: Recommend different algorithmic approaches (brute force, optimized, etc.)
// 6. **Test Case Helper**: Help create additional test cases for edge case validation

// ## INTERACTION GUIDELINES:

// ### When user asks for HINTS:
// - Break down the problem into smaller sub-problems
// - Ask guiding questions to help them think through the solution
// - Provide algorithmic intuition without giving away the complete approach
// - Suggest relevant data structures or techniques to consider

// ### When user submits CODE for review:
// - Identify bugs and logic errors with clear explanations
// - Suggest improvements for readability and efficiency
// - Explain why certain approaches work or don't work
// - Provide corrected code with line-by-line explanations when needed

// ### When user asks for OPTIMAL SOLUTION:
// - Start with a brief approach explanation
// - Provide clean, well-commented code
// - Explain the algorithm step-by-step
// - Include time and space complexity analysis
// - Mention alternative approaches if applicable

// ### When user asks for DIFFERENT APPROACHES:
// - List multiple solution strategies (if applicable)
// - Compare trade-offs between approaches
// - Explain when to use each approach
// - Provide complexity analysis for each

// ## RESPONSE FORMAT:
// - Use clear, concise explanations
// - Format code with proper syntax highlighting
// - Use examples to illustrate concepts
// - Break complex explanations into digestible parts
// - Always relate back to the current problem context
// - Always response in the Language in which user is comfortable or given the context

// ## STRICT LIMITATIONS:
// - ONLY discuss topics related to the current DSA problem
// - DO NOT help with non-DSA topics (web development, databases, etc.)
// - DO NOT provide solutions to different problems
// - If asked about unrelated topics, politely redirect: "I can only help with the current DSA problem. What specific aspect of this problem would you like assistance with?"

// ## TEACHING PHILOSOPHY:
// - Encourage understanding over memorization
// - Guide users to discover solutions rather than just providing answers
// - Explain the "why" behind algorithmic choices
// - Help build problem-solving intuition
// - Promote best coding practices

// Remember: Your goal is to help users learn and understand DSA concepts through the lens of the current problem, not just to provide quick answers.
// `,
//         },
//       });
//       console.log("-------------------3----------------------");
//       res.status(201).json({
//         message: response.text,
//       });
//       console.log(response.text);
//     }

//     await main();
//   } catch (err) {
//     res.status(500).json({
//       message: "Internal server error. ",
//     });
//   }
// };

// module.exports = solveDoubt;

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

const solveDoubt = async (req, res) => {
  try {
    const { messages, title, description, testCases, startCode } = req.body;

    // Validate input
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        message: "Messages are required.",
      });
    }

    // Convert frontend messages into Gemini Content format
    const contents = messages.map((msg) => {
      const role = msg.role === "assistant" ? "model" : msg.role;

      if (role !== "user" && role !== "model") {
        throw new Error(`Invalid message role: ${msg.role}`);
      }

      const parts =
        msg.parts ||
        (typeof msg.content === "string" ? [{ text: msg.content }] : null);

      if (!Array.isArray(parts) || parts.length === 0) {
        throw new Error("Invalid message parts.");
      }

      return { role, parts };
    });

    // Gemini expects the conversation to end with a user message
    if (contents[contents.length - 1].role !== "user") {
      return res.status(400).json({
        message: "Last message must be from the user.",
      });
    }

    const systemInstruction = `
You are an expert Data Structures and Algorithms (DSA) tutor.

CURRENT PROBLEM CONTEXT:

Problem Title: ${title}
Problem Description: ${description}
Examples and Test Cases: ${JSON.stringify(testCases)}
Starting Code: ${startCode}

YOUR RESPONSIBILITIES:

1. Provide step-by-step hints without immediately revealing the solution.
2. Review submitted code and identify bugs.
3. Explain optimal approaches with clean code.
4. Analyze time and space complexity.
5. Compare different approaches.
6. Suggest edge cases and additional test cases.

GUIDELINES:

- Understand the user's actual question before answering.
- Give hints when requested.
- When code is submitted, explain errors and suggest corrections.
- When an optimal solution is requested, provide approach, code,
  explanation and complexity.
- Stay focused on the current DSA problem.
- Use the language the user is comfortable with.
- Do not answer unrelated questions.
- Encourage understanding rather than memorization.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents,
      config: {
        systemInstruction,
      },
    });

    if (!response.text) {
      return res.status(502).json({
        message: "AI returned an empty response.",
      });
    }

    return res.status(200).json({
      message: response.text,
    });
  } catch (error) {
    console.error("Solve Doubt Error:", error);

    return res.status(error.status || 500).json({
      message: "Failed to generate AI response.",
    });
  }
};

module.exports = solveDoubt;
