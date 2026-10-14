import pick from "../utils/pick.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Generic CRUD handlers, reused for Project, Qualification and Contact
const createCrudController = (Model, fields) => ({
  list: asyncHandler(async (req, res) => {
    res.json(await Model.find().sort({ completionDate: -1 }));
  }),

  get: asyncHandler(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  }),

  create: asyncHandler(async (req, res) => {
    const doc = await Model.create(pick(req.body, fields));
    res.status(201).json(doc);
  }),

  update: asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, pick(req.body, fields), {
      new: true,
      runValidators: true
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  }),

  remove: asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.status(200).json({
      status: "success",
      message: `${Model.modelName} has been successfully deleted.`
    });
  }),

  // Automatically added to ALL models!
  removeAll: asyncHandler(async (req, res) => {
      // 1. Hard safety check against production
      if (process.env.NODE_ENV === "production") {
        return res.status(403).json({ 
          error: "Destructive actions are disabled in production" 
        });
      }
      // 2. Wipe the specific model's collection
      await Model.deleteMany({});

      res.status(200).json({
        status: "success",
        message: `All records for ${Model.modelName} have been removed successfully.`
      });
    })
});

export default createCrudController;
