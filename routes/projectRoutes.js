import express from "express";
import projectController from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictMiddleware.js"; 
const projectRouter = express.Router();

projectRouter.route("/")
  .get(protect, projectController.list)
  .post(protect,restrictTo("admin"), projectController.create)
  .delete(protect, restrictTo("admin"), projectController.removeAll); // DELETE all contacts
  
projectRouter.route("/:id")
  .get(protect,projectController.get)
  .patch(protect,restrictTo("admin"), projectController.update)
  .delete(protect,restrictTo("admin"), projectController.remove);

export default projectRouter;