import Qualification from "../models/Qualification.js";
import createCrudController from "./crudController.js";

const DEFAULT_FIELDS = ["title", "completionDate", "description", "year", "school", "credential", "displayOrder"];

export default createCrudController(Qualification, DEFAULT_FIELDS);
