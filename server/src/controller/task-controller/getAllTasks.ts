import express, { Request, Response, NextFunction } from "express";
import Tasks from "../../model/task";
import { JwtPayload } from "jsonwebtoken";
import User from "../../model/user";

export const getAllTasks = async (req: JwtPayload, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ where: { id: userId } });

    const allTasks = await Tasks.findAll();

    return res.status(200).send({
      status: "success",
      method: req.method,
      message: "All tasks successfully fetched",
      allTasks,
    });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({
      status: "Error",
      message: "Oops, an error occurred, failed to get  alltask",
    });
  }
};
