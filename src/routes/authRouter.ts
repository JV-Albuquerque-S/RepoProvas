import Router from "express";
import { signIn, signUp } from "../controllers/authController";
import { validateSchema } from "../middlewares/validateSchema";
import { signUpSchema, signInSchema } from "../schemas/authSchemas";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);

export default authRouter;