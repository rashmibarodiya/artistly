import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  const { description } = await req.json();

  const prompt = `
Extract structured event data from this request.

Return JSON with:
eventType
category
genres
budget
location
date

Request:
${description}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  return Response.json({ result: text });
}