import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  completionDate: { type: Date },
  description: { type: String, trim: true }
});

const Qualification = mongoose.model(
  "Qualification",
  qualificationSchema,
  "qualifications"
);

export default Qualification;

