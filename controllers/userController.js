import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { serializeUser, serializeUserList } from "../serializers/userSerializer.js";
import pick from "../utils/pick.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const SALT_ROUNDS = 12;

const userController = {
  // GET /api/users
  list: asyncHandler(async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(serializeUserList(users));
  }),

  // GET /api/users/:id
  get: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(serializeUser(user));
  }),

  // POST /api/users
  create: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body || {};
    
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, passwordHash });
    
    res.status(201).json(serializeUser(user));
  }),

  // PATCH /api/users/:id
  update: asyncHandler(async (req, res) => {
    const body = req.body || {};
    const changes = pick(body, ["name", "email"]);

    // Hash the new password only if it's provided in the request
    if (body.password) {
      changes.passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);
    }

    const user = await User.findByIdAndUpdate(req.params.id, changes, {
      new: true,
      runValidators: true
    });

    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(serializeUser(user));
  }),

  // DELETE /api/users/:id
  remove: asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  })
};

export default userController;