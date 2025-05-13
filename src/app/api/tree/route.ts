import { z } from "zod";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";

export const runtime = "edge";

const googleModel = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
})("gemini-1.5-flash-latest");

const FamilyMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  relation: z.string(),
  health: z.array(z.string()),
  parentIds: z.array(z.string()).nullable(), // plural now
});

const FamilyFlatSchema = z.array(FamilyMemberSchema);

export async function POST(req: Request) {
  const { messages } = await req.json();
  const userPrompt = messages[messages.length - 1].content;

  const prompt = `You are a multilingual NLP engine that extracts structured family relationship data and converts it into a flat array for post-processing into a family tree.

Each item must include:
- "id": a unique identifier string (e.g., "maria", "elena", etc.)
- "name": the full name (e.g., "Maria Lopez")
- "relation": their relationship to the speaker (e.g., mother, father, self)
- "health": an array of health conditions as strings (e.g., "Diabetes: diagnosed at 40")
- "parentIds": an array of biological parent IDs (e.g., ["maria", "carlos"]) or null if unknown

Be careful to include all family members mentioned in the text, even if they are not directly related to the speaker. Use "id" as the key for each family member.
The "id" should be a unique identifier for each family member, and the "parentIds" should be an array of IDs of their biological parents. If a family member has no known parents, set "parentIds" to null.

The "relation" should be a string that describes the relationship of the family member to the speaker. Use "mother", "father", "sister", "brother", "grandmother", "grandfather", "aunt", "uncle", "cousin", or any other relevant term. If the relationship is not clear, use "unknown".
be wary of what side a grandfather/grandmother or any relative is on, this is important for assigning the correct parentId of the child,

NOTE that terms like "aunt" or "uncle" can refer to either side of the family, so be careful to assign the correct parentId of the child.

IMPORTANTLY, phrases like "My Mother" or "My Father" should automatically make clear the parent Ids of an individual, so be careful to assign the correct parentId of the child.

Include "Self" as a person with "relation": "Self". Return only valid JSON — no commentary.

Here is the text to process:
"${userPrompt}"`;

  try {
    const result = await generateObject({
      model: googleModel,
      prompt,
      schema: FamilyFlatSchema,
    });

    return new Response(JSON.stringify(result.object), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("generateObject error:", err);
    return new Response(JSON.stringify({ error: "Failed to process" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
