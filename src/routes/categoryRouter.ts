import { Router } from "express";
import {getCategories} from "../controllers/categoryController";
import verifyToken from "../middlewares/verifyToken";

const categoryRouter = Router();

categoryRouter.get("/categories", verifyToken, getCategories);

export default categoryRouter;