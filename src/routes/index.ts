import { Router } from "express";

import authRouter from "./authRouter";
import categoryRouter from "./categoryRouter";

const router = Router();

router.use(authRouter);
router.use(categoryRouter);

export default router;