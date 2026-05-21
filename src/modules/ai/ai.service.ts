import openai from "../../config/openai";

export const generateTicketSummary = async (
  title: string,
  description: string,
) => {
  const prompt = `
  
  Summarize this support ticket in 1 short sentence.

  Title:
  ${title}

  Description:
  ${description}
  
  `;

  const response = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};
