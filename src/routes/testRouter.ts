import { Router } from "express";
import { getTestsByTeacher, getTestsByDiscipline, postTest } from "../controllers/testController"
import { validateSchema } from "../middlewares/validateSchema";
import verifyToken from "../middlewares/verifyToken";
import testSchema from "../schemas/testSchemas";

const testRouter = Router();

testRouter.post("/tests", verifyToken, validateSchema(testSchema), postTest);
testRouter.get("/tests/teacher", verifyToken, getTestsByTeacher);
testRouter.get("/tests/discipline", verifyToken, getTestsByDiscipline);

export default testRouter;