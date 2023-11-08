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
exports.updateTask = void 0;
const task_1 = __importDefault(require("../../model/task"));
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const { text, day, reminder } = req.body;
        const updateTask = {
            text,
            day,
            reminder,
        };
        const [numOfUpdatedRows, updatedTasks] = yield task_1.default.update(updateTask, { where: { id: taskId },
            returning: true
        });
        const updatedTask = yield task_1.default.findOne({ where: { id: taskId } });
        return res.status(200).json({
            status: "successful",
            method: req.method,
            message: "Task updated successfull",
            data: updatedTask
        });
    }
    catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Failed to create task" });
    }
});
exports.updateTask = updateTask;
