import { Router } from "express";
import authController from "../controllers/authController.js";
import { serializeUser } from "../serializers/userSerializer.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/signin", authController.signin);
authRouter.post("/signout", authController.signout);

export default authRouter;