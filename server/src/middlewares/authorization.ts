import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { APP_SECRET } from "../config/config";
import User from "../model/user";

export const auth = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
   
    if (authorization === "undefined")
      return res.status(401).send({
        status: "Unauthorized",
        message:
          "oops, an error occur, kindly ensure you login with valid details",
      });
    const pin = authorization.split(" ")[1];
 
    if (!pin || pin === "")
      return res.status(401).send({
        satus: "Unauthorized",
        message: "The pin can't be used",
      });
    const decoded = jwt.verify(pin, `${APP_SECRET}`);
    req.user = decoded;
    return next();
  } catch (error) {
    console.log("ERROR", error);
    return res.status(401).send({
      status: "Error",
      message: "Unathorized",
    });
  }
};
