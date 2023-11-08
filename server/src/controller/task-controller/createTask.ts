import express, { Response, Request, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import Tasks, { TaskAttributes } from "../../model/task";
import User from "../../model/user";
import { v4 } from "uuid";

export const createTask = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = v4();

    const userId = req.user.id;    

    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(401).send({ message: "Unauthorize" });

    const { text, day, reminder } = req.body;
    const newTask: TaskAttributes = {
      id: v4(),
      userId,
      text,
      day,
      reminder,
    };

    const createdTask = await Tasks.create(newTask);
    return res.status(201).json({
      status: "successful",
      method: req.method,
      message: "Task created successfull",
       createdTask,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Failed to create task" });
  }
};
