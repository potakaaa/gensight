import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { google } from "../google"

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const userPrompt = messages[messages.length - 1].content;

  const extractionPrompt = `You are a powerful and Multilingual Natural Language Processing (NLP) engine designed to extract structured information about family relationships from the following text. Identify individual family members and for each, extract their relationship to a central person (if implied or stated), their lineage (maternal or paternal), their name (if provided), their age (if provided), and their health history (as a list of objects with "Diagnosis" and "Details" keys) when inputted in different languages you store details in english.

The output should be a JSON array of objects. Each object should represent a family member and have the following keys: "Relation to Patient", "Lineage", "Name", "Age", and "Health History".

- "Relation to Patient": The relationship of this individual to the central person (e.g., mother, father, brother, grandmother).
- "Lineage": Either "Maternal" (mother's side), "Paternal" (father's side), or null if not explicitly stated.
- "Name": The name of the family member, or null if not provided.
- "Age": The age of the family member, or null if not provided.
- "Health History": An array of objects, where each object has two keys:
    - "Diagnosis": The name of the medical condition.
    - "Details": Any additional information, anecdotes, or context provided about that condition. If no health history is mentioned, this should be an empty array.

If a piece of information is not explicitly mentioned in the text, the corresponding value in the JSON should be null (except for Health History, which should be an empty array if no conditions are mentioned).

If the text contains information about multiple family members, create a separate JSON object for each.

Here is the text to process:
"${userPrompt}"

Ensure the output is valid JSON.`;

  try {
    const result = streamText({
      model: google("gemini-1.5-pro-latest"),
      system: "You are a helpful assistant that strictly outputs valid JSON.",
      messages: [{ role: "user", content: extractionPrompt }],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing NLP:", error);

    return new Response(
      JSON.stringify({ error: "Failed to process text with NLP." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
