import { Request, Response, NextFunction } from "express";
import User, { UserAttribute } from "../../model/user";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { GenerateToken } from "../../utilites/helpers";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    //checking email
    const verifyUser = (await User.findOne({
      where: { email },
    })) as unknown as UserAttribute;
    if (!verifyUser)
      return res
        .status(400)
        .send({ status: "Failed", message: "Email or password not valid" });
    const verifyPassword = await bcrypt.compare(password, verifyUser.password);
    if (!verifyPassword)
      return res.status(400).send({ message: "enter correct password" });

    const token = await GenerateToken({
      id: verifyUser.id,
    });
    res.status(200).send({
      status: "Successfull",
      method: req.method,
      message: "You are in , welcome!",
      user: verifyUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        status: "Error",
        message: "oops, an error occur, failed to create User",
      });
  }
};
