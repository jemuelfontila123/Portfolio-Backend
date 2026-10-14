import Project from "../models/Project.js";
import createCrudController from "./crudController.js";
const DEFAULT_FIELDS = ["title", "completionDate", "description"];

export default createCrudController(Project, DEFAULT_FIELDS);
