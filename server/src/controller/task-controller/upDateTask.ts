import express, { Response, Request, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import Tasks, { TaskAttributes } from "../../model/task";
import User from "../../model/user";
import { v4 } from "uuid";

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  

    const taskId = req.params.id;      

    const { text, day, reminder } = req.body;
    const updateTask: Partial<TaskAttributes> = {      
      text,
      day,
      reminder,
    };
      const [numOfUpdatedRows, updatedTasks] = await Tasks.update(updateTask, 
        {where:{id:taskId}, 
        returning: true
    })
    const updatedTask = await Tasks.findOne({where:{id:taskId}})
    return res.status(200).json({
      status: "successful",
      method: req.method,
      message: "Task updated successfull",
       data:updatedTask
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Failed to create task" });
  }
};