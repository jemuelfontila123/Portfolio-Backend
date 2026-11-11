import express from "express";
import qualificationController from "../controllers/qualificationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictMiddleware.js"; 

const qualificationRouter = express.Router();

qualificationRouter.route("/")
  .get(protect, qualificationController.list)
  .post(protect, restrictTo("admin"), qualificationController.create)
  .delete(protect, restrictTo("admin"), qualificationController.removeAll); // DELETE all contacts
qualificationRouter.route("/:id")
  .get(protect,qualificationController.get)
  .patch(protect, restrictTo("admin"), qualificationController.update)
  .delete(protect,restrictTo("admin"), qualificationController.remove);

export default qualificationRouter;