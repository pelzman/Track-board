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
exports.signUpUser = void 0;
const uuid_1 = require("uuid");
const user_1 = __importDefault(require("../../model/user"));
const helpers_1 = require("../../utilites/helpers");
const signUpUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, uuid_1.v4)();
        const { userName, email, password } = req.body;
        // Checking email
        const emailExist = (yield user_1.default.findOne({ where: { email: email } }));
        if (emailExist) {
            return res.status(400).json({
                message: "Oops, email already exists",
            });
        }
        const convertedEmail = email.trim().toLowerCase();
        const passwordEncoded = yield (0, helpers_1.HashPassword)(password);
        if (!userName) {
            return res.status(400).send({
                message: "Username is required",
            });
        }
        const newUser = yield user_1.default.create({
            id: userId,
            userName,
            email: convertedEmail,
            password: passwordEncoded,
        });
        // Checking if the user exists
        const existUser = (yield user_1.default.findOne({ where: { email: convertedEmail } }));
        if (existUser) {
            return res.status(200).json({
                method: req.method,
                status: "Successful",
                message: "User created successfully",
                user: existUser,
            });
        }
    }
    catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({
            status: "Error",
            message: "Oops, an error occurred, failed to create a user",
        });
    }
});
exports.signUpUser = signUpUser;
