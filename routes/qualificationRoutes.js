import express from "express";
import qualificationController from "../controllers/qualificationController.js";

const qualificationRouter = express.Router();

qualificationRouter.route("/")
  .get(qualificationController.list)
  .post(qualificationController.create);

qualificationRouter.route("/:id")
  .get(qualificationController.get)
  .patch(qualificationController.update)
  .delete(qualificationController.remove);

export default qualificationRouter;