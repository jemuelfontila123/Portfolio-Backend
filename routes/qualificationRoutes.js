import express from "express";
import qualificationController from "../controllers/qualificationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictMiddleware.js"; 

const qualificationRouter = express.Router();

qualificationRouter.route("/")
  .get(qualificationController.list)
  .post(qualificationController.create)
  .delete(protect, restrictTo("admin"), qualificationController.removeAll); // DELETE all contacts
qualificationRouter.route("/:id")
  .get(qualificationController.get)
  .patch(qualificationController.update)
  .delete(qualificationController.remove);

export default qualificationRouter;