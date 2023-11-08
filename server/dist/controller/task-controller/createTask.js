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
exports.createTask = void 0;
const task_1 = __importDefault(require("../../model/task"));
const user_1 = __importDefault(require("../../model/user"));
const uuid_1 = require("uuid");
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const userId = req.user.id;
        const user = yield user_1.default.findOne({ where: { id: userId } });
        if (!user)
            return res.status(401).send({ message: "Unauthorize" });
        const { text, day, reminder } = req.body;
        const newTask = {
            id: (0, uuid_1.v4)(),
            userId,
            text,
            day,
            reminder,
        };
        const createdTask = yield task_1.default.create(newTask);
        return res.status(201).json({
            status: "successful",
            method: req.method,
            message: "Task created successfull",
            createdTask,
        });
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Failed to create task" });
    }
});
exports.createTask = createTask;
