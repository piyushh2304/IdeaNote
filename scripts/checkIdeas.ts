import { listAllIdeas } from "../server/db/sqlite";

async function checkIdeas() {
  try {
    const ideas = await listAllIdeas();
    console.log("Ideas in DB:", ideas);
  } catch (error) {
    console.error("Error fetching ideas:", error);
  }
}

checkIdeas();
