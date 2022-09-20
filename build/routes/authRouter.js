"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validateSchema_1 = require("../middlewares/validateSchema");
const authSchemas_1 = require("../schemas/authSchemas");
const authRouter = (0, express_1.default)();
authRouter.post("/sign-up", (0, validateSchema_1.validateSchema)(authSchemas_1.signUpSchema), authController_1.signUp);
authRouter.post("/sign-in", (0, validateSchema_1.validateSchema)(authSchemas_1.signInSchema), authController_1.signIn);
exports.default = authRouter;
