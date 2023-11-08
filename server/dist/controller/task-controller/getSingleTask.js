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
exports.getSingleTask = void 0;
const task_1 = __importDefault(require("../../model/task"));
const getSingleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const singleTask = yield task_1.default.findOne({ where: { id: taskId } });
        if (!singleTask)
            return res.status(400).send({
                message: `oops, task with id ${taskId} cannot be found`,
            });
        return res.status(200).send({
            status: "success",
            method: req.method,
            message: "Task successfully fetched",
            singleTask,
        });
    }
    catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({
            status: "Error",
            message: "Oops, an error occurred, failed to get a task",
        });
    }
});
exports.getSingleTask = getSingleTask;
