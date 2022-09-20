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
exports.signUp = exports.signIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRepositories_1 = __importDefault(require("../repositories/userRepositories"));
function signIn(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepositories_1.default.findUserByEmail(userData.email);
        if (!user)
            throw { status: 404, message: "Invalid credentials" };
        const validPassword = bcrypt_1.default.compareSync(userData.password, user.password);
        if (!validPassword)
            throw { status: 401, message: "Invalid credentials" };
        //
        // --------- FALAR COM ADRIANO SOBRE O ERRO DO JWT ------------
        //
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, "g64s48g468dfg468d468g84zd468h468z68dt48h");
        return token;
    });
}
exports.signIn = signIn;
function signUp(createUserData) {
    return __awaiter(this, void 0, void 0, function* () {
        const alreadyExist = yield userRepositories_1.default.findUserByEmail(createUserData.email);
        if (alreadyExist)
            throw { status: 409, message: "Email already used" };
        const hashedPassword = bcrypt_1.default.hashSync(createUserData.password, bcrypt_1.default.genSaltSync());
        yield userRepositories_1.default.insertUser(Object.assign(Object.assign({}, createUserData), { password: hashedPassword }));
    });
}
exports.signUp = signUp;
