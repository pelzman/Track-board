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
exports.isValidDate = exports.isValidEmail = exports.HashPassword = exports.GenerateToken = exports.APP_SECRET = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.APP_SECRET = process.env.APP_SECRET;
const GenerateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, `${exports.APP_SECRET}`, { expiresIn: "1d" });
};
exports.GenerateToken = GenerateToken;
const HashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    return hash;
});
exports.HashPassword = HashPassword;
const isValidEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // Basic email format validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
});
exports.isValidEmail = isValidEmail;
const isValidDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    // Basic date format validation (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
});
exports.isValidDate = isValidDate;
