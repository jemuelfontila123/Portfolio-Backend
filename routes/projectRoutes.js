import express from "express";
import projectController from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictMiddleware.js"; 
const projectRouter = express.Router();

projectRouter.route("/")
  .get(projectController.list)
  .post(projectController.create)
  .delete(protect, restrictTo("admin"), projectController.removeAll); // DELETE all contacts
  
projectRouter.route("/:id")
  .get(projectController.get)
  .patch(projectController.update)
  .delete(projectController.remove);

export default projectRouter;