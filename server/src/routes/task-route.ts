import { Router, Request, Response } from "express";
import { createTask } from "../controller/task-controller/createTask";
import { getAllTasks } from "../controller/task-controller/getAllTasks";
import { getSingleTask } from "../controller/task-controller/getSingleTask";
import { deleteTask } from "../controller/task-controller/deleteTask";
import { updateTask } from "../controller/task-controller/upDateTask";
import { auth } from "../middlewares/authorization";

const router = Router();

router.post("/tasks", auth, createTask);
router.get("/tasks", auth, getAllTasks);
router.get("/tasks/:id", getSingleTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
