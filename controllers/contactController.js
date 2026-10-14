import Contact from "../models/Contact.js";
import createCrudController from "./crudController.js";


const DEFAULT_FIELDS = ["firstName", "lastName", "contactNumber", "email", "message"];

const contactController = createCrudController(Contact, DEFAULT_FIELDS);

// Kept so your existing contactRoutes.js (which imports createContact) still works

export default contactController;
