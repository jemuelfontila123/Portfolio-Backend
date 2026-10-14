import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  completionDate: { type: Date },
  description: { type: String, trim: true },
});

const Project = mongoose.model(
  "Project",
  projectSchema,
  "projects"
);

export default Project;
