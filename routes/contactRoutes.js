import express from "express";
import contactController from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictMiddleware.js";

const contactRouter = express.Router();

// Collection routes
contactRouter
  .route("/")
  .get(protect, contactController.list)
  .post(contactController.create)
  .delete(protect, restrictTo("admin"), contactController.removeAll);

// Individual contact routes
contactRouter
  .route("/:id")
  .get(protect, contactController.get)
  .patch(protect, restrictTo("admin"), contactController.update)
  .delete(protect, restrictTo("admin"), contactController.remove);

export default contactRouter;