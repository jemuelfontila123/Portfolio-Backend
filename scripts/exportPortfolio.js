
import mongoose from "mongoose";
import { mkdir, writeFile, rename } from "node:fs/promises";

import Project from "../models/Project.js";
import Qualification from "../models/Qualification.js";

import { connectPortfolio } from "./portfolioDb.js";

import {
  projects as seedProjects,
  qualifications as seedQualifications,
} from "./portfolioData.js";

// Generated JSON directory.
const dir = new URL(
  "../client/src/user/data/generated/",
  import.meta.url
);

// Only recognize original seeded titles.
const projectTitles = seedProjects.map(
  (project) => project.title
);

const qualificationTitles = seedQualifications.map(
  (qualification) => qualification.program ?? qualification.title
);

// Safely overwrite existing JSON files.
async function save(name, rows) {
  const temp = new URL(`${name}.json.tmp`, dir);
  const output = new URL(`${name}.json`, dir);

  await writeFile(
    temp,
    JSON.stringify(rows, null, 2) + "\n",
    "utf8"
  );

  await rename(temp, output);

  console.log(`Rewritten: ${name}.json`);
}

// Retrieve only original seeded projects.
async function getProjects() {
  const projects = await Project.find({
    title: { $in: projectTitles },
  })
    .select("title image description role outcome displayOrder")
    .sort({ displayOrder: 1, _id: 1 })
    .lean();

  return projects.map((project) => ({
    id: String(project._id),
    title: project.title,
    image: project.image ?? "",
    description: project.description ?? "",
    role: project.role ?? "",
    outcome: project.outcome ?? "",
  }));
}

// Retrieve only original seeded qualifications.
async function getQualifications() {
  const qualifications = await Qualification.find({
    title: { $in: qualificationTitles },
  })
    .select("title year school credential displayOrder")
    .sort({ displayOrder: 1, _id: 1 })
    .lean();

  return qualifications.map((qualification) => ({
    id: String(qualification._id),
    program: qualification.title,
    year: qualification.year ?? "",
    school: qualification.school ?? "",
    credential: qualification.credential ?? "",
  }));
}

// Generate portfolio snapshots.
async function main() {
  try {
    await connectPortfolio();

    const [projects, qualifications] = await Promise.all([
      getProjects(),
      getQualifications(),
    ]);

    await mkdir(dir, { recursive: true });

    await save("projects", projects);
    await save("qualifications", qualifications);

    console.log(
      `Exported ${projects.length} projects and ${qualifications.length} qualifications`
    );
  } catch (error) {
    console.error("Export failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await main();
