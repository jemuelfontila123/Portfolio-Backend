import express from "express";
import projectController from "../controllers/projectController.js";

const projectRouter = express.Router();

projectRouter.route("/")
  .get(projectController.list)
  .post(projectController.create);

projectRouter.route("/:id")
  .get(projectController.get)
  .patch(projectController.update)
  .delete(projectController.remove);

export default projectRouter;