"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/categories", verifyToken_1.default, categoryController_1.getCategories);
exports.default = categoryRouter;
