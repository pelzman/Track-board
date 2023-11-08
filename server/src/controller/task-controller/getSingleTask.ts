import express, { Request, Response, NextFunction } from "express";
import Tasks from "../../model/task";
import { JwtPayload } from "jsonwebtoken";

export const getSingleTask = async (req:Request, res: Response) => {
  try {
    const taskId = req.params.id
    const singleTask = await Tasks.findOne({where:{id:taskId}});
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
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({
      status: "Error",
      message: "Oops, an error occurred, failed to get a task",
    });
  }
};
