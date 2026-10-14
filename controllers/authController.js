import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { serializeUser } from "../serializers/userSerializer.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  });
};

const authController = {
  signup: asyncHandler(async (req, res) => {
    const { name, email, password, role} = req.body || {};
    if (!password) return res.status(400).json({ error: "Password is required" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, role, passwordHash });

    const token = signToken(user._id);

    res.status(201).json({
      status: "success",
      token,
      data: serializeUser(user)
    });
  }),

  signin: asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    // Find user and explicitly select passwordHash since it's hidden by default or schema
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken(user._id);

    res.json({
      status: "success",
      token,
      data: serializeUser(user)
    });
  }),

  signout: asyncHandler(async (req, res) => {
    // For stateless JWTs, sign-out is handled primarily client-side by deleting the token.
    // However, sending a success response confirms the endpoint works.
    res.status(200).json({ status: "success", message: "Successfully signed out" });
  })
};

export default authController;