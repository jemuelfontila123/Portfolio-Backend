import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/")
  .get(userController.list)      // GET /api/users
  .post(userController.create)  // POST /api/users
  .delete(userController.removeAll); // DELETE all contacts

userRouter.route("/:id")
  .get(userController.get)       // GET /api/users/:id
  .patch(userController.update)  // PATCH /api/users/:id
  .delete(userController.remove); // DELETE /api/users/:id

export default userRouter;