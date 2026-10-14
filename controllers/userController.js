import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { render, renderMany } from "../views/userView.js";
import pick from "../utils/pick.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const list = asyncHandler(async (req, res) => {
  res.json(renderMany(await User.find()));
});

export const get = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(render(user));
});

export const create = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!password) return res.status(400).json({ error: "Password is required" });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });
  res.status(201).json(render(user));
});

export const update = asyncHandler(async (req, res) => {
  const body = req.body || {};
  const changes = pick(body, ["name", "email"]);
  if (body.password) changes.passwordHash = await bcrypt.hash(body.password, 12);

  const user = await User.findByIdAndUpdate(req.params.id, changes, {
    new: true,
    runValidators: true
  });
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(render(user));
});

export const remove = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});
