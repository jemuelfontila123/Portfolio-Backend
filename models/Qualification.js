import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  completionDate: { type: Date },
  year: { type: String, trim: true },
  school: { type: String, trim: true },
  credential: { type: String, trim: true },
  displayOrder: { type: Number, min: 0, default: 999 },
  description: { type: String, trim: true }
});

const Qualification = mongoose.model(
  "Qualification",
  qualificationSchema,
  "qualifications"
);

export default Qualification;

