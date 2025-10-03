import { insertIdea } from "../server/db/sqlite";

async function insertSeedIdeas() {
  const seedIdeas = [
    {
      text: "A smart mirror with built-in sensors and AI that provides real-time health insights. When a user stands in front of it, it performs facial analysis, posture detection, and skin condition monitoring. Integrated with smart scales and wearables, it gives daily health reports, suggests workouts, and even detects early signs of illness through visual and behavioral data (e.g., dehydration, fatigue).",
    },
    {
      text: "An AR app for smart glasses that translates foreign languages in real-time and overlays the translated text directly onto the world. Whether you’re reading a street sign in Tokyo or having a conversation in Paris, it displays subtitles or translated signage naturally. It also learns context and tone over time, making the translations smarter and more nuanced. Ideal for travelers, international workers, or global students.",
    },
  ];

  for (const idea of seedIdeas) {
    try {
      const inserted = await insertIdea(idea.text);
      console.log("Inserted idea:", inserted);
    } catch (error) {
      console.error("Failed to insert idea:", idea.text, error);
    }
  }
}

insertSeedIdeas();
