"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
        if (!token)
            throw { status: 401, message: "missing token" };
        //
        // --------- FALAR COM ADRIANO SOBRE O ERRO DO JWT ------------
        //
        try {
            const data = jsonwebtoken_1.default.verify(token, "g64s48g468dfg468d468g84zd468h468z68dt48h");
            const user = yield database_1.prisma.user.findFirst({
                where: {
                    email: data.email,
                },
            });
            if (!user)
                throw { status: 404, message: "user not found" };
            res.locals.user = user;
            next();
        }
        catch (error) {
            console.log(error);
            throw { status: 401, message: "invalid token" };
        }
    });
}
exports.default = verifyToken;
