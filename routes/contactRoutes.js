import express from "express";
import contactController from "../controllers/contactController.js";

const contactRouter = express.Router();

// Routes for handling collections (e.g., /api/contacts)
contactRouter.route("/contacts")
  .get(contactController.list)     // GET all contacts
  .post(contactController.create);           // POST a new contact (using your custom handler)

// Routes for handling individual items by ID (e.g., /api/contacts/:id)
contactRouter.route("/contacts/:id")
  .get(contactController.get)        // GET a single contact
//   .patch(contactController.update)   // UPDATE a contact
//   .delete(contactController.remove); // DELETE a contact

export default contactRouter;