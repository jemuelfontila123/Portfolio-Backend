import express from "express";
import contactController from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictMiddleware.js"; 

const contactRouter = express.Router();

// Routes for handling collections (e.g., /api/contacts)
contactRouter.route("/")
  .get(contactController.list)     // GET all contacts
  .post(contactController.create)        // POST a new contact
  .delete(protect, restrictTo("admin"), contactController.removeAll); // DELETE all contacts

// Routes for handling individual items by ID (e.g., /api/contacts/:id)
contactRouter.route("/:id")
  .get(contactController.get)        // GET a single contact
  .patch(contactController.update)   // UPDATE a contact
  .delete(contactController.remove); // DELETE a single contact
  
export default contactRouter;