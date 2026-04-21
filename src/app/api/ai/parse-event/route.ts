export const runtime = "nodejs";

import { connectDB } from "@/db/connect";
import { Artist } from "@/db/schema/Artist";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    //  PROMPT
    const prompt = `
You are an AI that extracts structured event data.

Strict rules:
- Return ONLY valid JSON
- Do NOT add explanations or markdown
- category MUST be one of: Singer, DJ, Band, Dancer, Musician, Instrumentalist
- NEVER return generic values like "music"
- If user mentions singing → category = "Singer"

Format:
{
  "eventType": "",
  "category": "",
  "genres": [],
  "budget": { "min": 0, "max": 0 },
  "location": "",
  "date": ""
}

Request:
${description}
`;

    //  Groq setup
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY!,
    });

    let text = "";

    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a strict JSON generator. Only output valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 300,
      });

      text = response.choices[0]?.message?.content || "";

      if (!text) {
        throw new Error("Empty response from Groq");
      }
    } catch (err) {
      console.error("Groq error:", err);
      return Response.json(
        { error: "AI request failed" },
        { status: 500 }
      );
    }

    //  Parse JSON
    let parsed;
    try {
      const cleanText = text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleanText);
    } catch (err) {
      console.error(" JSON parse error:", text);
      return Response.json(
        { error: "AI parsing failed", raw: text },
        { status: 500 }
      );
    }

    console.log(" PARSED:", parsed);

    //  NORMALIZATION

    // Category mapping
    const categoryMap: any = {
      music: "Singer",
      singer: "Singer",
      dj: "DJ",
      band: "Band",
      dancer: "Dancer",
      musician: "Musician",
      instrumentalist: "Instrumentalist",
    };

    let category =
      categoryMap[parsed.category?.toLowerCase()] || parsed.category;

    // EventType → Genre mapping
    const eventTypeGenreMap: any = {
      wedding: ["Bollywood", "Sufi", "Classical"],
      party: ["Bollywood", "Pop", "Hip Hop", "EDM"],
      corporate: ["Jazz", "Soft Rock", "Instrumental"],
      concert: ["Rock", "Pop"],
    };

    let genres = (parsed.genres || []).map((g: string) => g.trim());

    if (
      parsed.eventType &&
      eventTypeGenreMap[parsed.eventType.toLowerCase()]
    ) {
      genres = [
        ...new Set([
          ...genres,
          ...eventTypeGenreMap[parsed.eventType.toLowerCase()],
        ]),
      ];
    }

    console.log(" NORMALIZED:", { category, genres });

    // DB
    await connectDB();

    const artists = await Artist.find({
      category: new RegExp(`^${category}$`, "i"),
      genres: {
        $in: genres.map((g: string) => new RegExp(g, "i")),
      },
      isActive: true,
    })
      .sort({ "rating.average": -1 })
      .limit(10)
      .lean();

    console.log("FOUND ARTISTS:", artists.length);

    return Response.json({
      parsed,
      normalized: { category, genres },
      artists,
    });

  } catch (err) {
    console.error(" API error:", err);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}