import express from "express";
import contactController from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictMiddleware.js"; 

const contactRouter = express.Router();

// Routes for handling collections (e.g., /api/contacts)
contactRouter.route("/")
  .get(protect,contactController.list)     // GET all contacts
  .post(protect, restrictTo("admin"),contactController.create)        // POST a new contact
  .delete(protect, restrictTo("admin"), contactController.removeAll); // DELETE all contacts

// Routes for handling individual items by ID (e.g., /api/contacts/:id)
contactRouter.route("/:id")
  .get(protect, contactController.get)        // GET a single contact
  .patch(protect,restrictTo("admin"), contactController.update)   // UPDATE a contact
  .delete(protect, restrictTo("admin"), contactController.remove); // DELETE a single contact
  
export default contactRouter;