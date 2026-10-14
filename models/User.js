import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true }
  },
  // Mongoose manages the created/updated dates automatically
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

const User = mongoose.model(
  "User",
  userSchema,
  "users"
);

export default User;

