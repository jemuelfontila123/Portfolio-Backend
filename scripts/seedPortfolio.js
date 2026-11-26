import mongoose from "mongoose";
import Project from "../models/Project.js";
import Qualification from "../models/Qualification.js";

import { connectPortfolio } from "./portfolioDb.js";
import { projects, qualifications } from "./portfolioData.js";

async function seed(Model, rows, name) {
  for (const { id, program, ...fields } of rows) {
    const title = program ?? fields.title;

    const data = {
      ...fields,
      title,
      displayOrder: id,
    };

    const existing = await Model.findOne({ title });

    if (existing) {
      // Preserve existing edits and fill missing fields.
      for (const [key, value] of Object.entries(data)) {
        if (
          existing.get(key) == null ||
          (key === "displayOrder" &&
            existing.get(key) === 999)
        ) {
          existing.set(key, value);
        }
      }

      await existing.save();

      console.log(`Existing: ${title}`);
    } else {
      await Model.create(data);

      console.log(`Created: ${title}`);
    }
  }

  console.log(`Seeded ${name}: ${rows.length} source records`);
}

async function main() {
  try {
    await connectPortfolio();

    await seed(Project, projects, "projects");
    await seed(Qualification, qualifications, "qualifications");

    console.log("Portfolio seeding completed.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await main();