import express, { Request, Response, NextFunction } from "express";
import Tasks from "../../model/task";
import { JwtPayload } from "jsonwebtoken";

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const deleteTask = await Tasks.destroy({ where: { id: taskId } });
    return res.status(200).send({
      status: "success",
      method: req.method,
      message: `Task with id: ${taskId} successfully deleted`,
    });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({
      status: "Error",
      message: "Oops, an error occurred, failed to delete task",
    });
  }
};
