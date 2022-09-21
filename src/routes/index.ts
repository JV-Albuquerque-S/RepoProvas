import { Router } from "express";

import authRouter from "./authRouter";
import testRouter from "./testRouter";
import categoryRouter from "./categoryRouter";

const router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(categoryRouter);

export default router;