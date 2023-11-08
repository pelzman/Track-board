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
exports.loginUser = void 0;
const user_1 = __importDefault(require("../../model/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../../utilites/helpers");
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //checking email
        const verifyUser = (yield user_1.default.findOne({
            where: { email },
        }));
        if (!verifyUser)
            return res
                .status(400)
                .send({ status: "Failed", message: "Email or password not valid" });
        const verifyPassword = yield bcrypt_1.default.compare(password, verifyUser.password);
        if (!verifyPassword)
            return res.status(400).send({ message: "enter correct password" });
        const token = yield (0, helpers_1.GenerateToken)({
            id: verifyUser.id,
        });
        res.status(200).send({
            status: "Successfull",
            method: req.method,
            message: "You are in , welcome!",
            user: verifyUser,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .send({
            status: "Error",
            message: "oops, an error occur, failed to create User",
        });
    }
});
exports.loginUser = loginUser;
