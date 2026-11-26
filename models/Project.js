import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  completionDate: { type: Date },
  image: { type: String, trim: true },
  role: { type: String, trim: true },
  outcome: { type: String, trim: true },
  displayOrder: { type: Number, min: 0, default: 999 },
  description: { type: String, trim: true },
});

const Project = mongoose.model(
  "Project",
  projectSchema,
  "projects"
);

export default Project;
