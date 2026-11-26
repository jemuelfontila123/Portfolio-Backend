
import pick from "../utils/pick.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Models allowed to perform bulk deletion in production.
const productionBulkDeleteModels = new Set([
  "Project",
  "Qualification",
]);

// Generic CRUD handlers reused by multiple models.
const createCrudController = (Model, fields) => ({
  // GET all records
  list: asyncHandler(async (req, res) => {
    const documents = await Model.find().sort({
      completionDate: -1,
    });

    res.json(documents);
  }),

  // GET a single record
  get: asyncHandler(async (req, res) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({
        error: "Not found",
      });
    }

    res.json(doc);
  }),

  // POST a new record
  create: asyncHandler(async (req, res) => {
    const doc = await Model.create(
      pick(req.body, fields)
    );

    res.status(201).json(doc);
  }),

  // PATCH an existing record
  update: asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      pick(req.body, fields),
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      return res.status(404).json({
        error: "Not found",
      });
    }

    res.json(doc);
  }),

  // DELETE an individual record
  remove: asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(
      req.params.id
    );

    if (!doc) {
      return res.status(404).json({
        error: "Not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: `${Model.modelName} has been successfully deleted.`,
    });
  }),

  // DELETE all records
  // Authorization is enforced by route middleware.
  removeAll: asyncHandler(async (req, res) => {
    if (
      process.env.NODE_ENV === "production" &&
      !productionBulkDeleteModels.has(Model.modelName)
    ) {
      return res.status(403).json({
        error: "Destructive actions are disabled in production",
      });
    }

    await Model.deleteMany({});

    res.status(200).json({
      status: "success",
      message: `All records for ${Model.modelName} have been removed successfully.`,
    });
  }),
});

export default createCrudController;
