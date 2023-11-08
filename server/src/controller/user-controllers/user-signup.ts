import {Request,Response, NextFunction} from "express"
import { v4 } from "uuid"
import User,{UserAttribute} from "../../model/user"
import { HashPassword, GenerateToken} from "../../utilites/helpers"



export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = v4();
      const { userName, email, password } = req.body;
  
      // Checking email
      const emailExist = (await User.findOne({ where: { email:email } })) as unknown as UserAttribute;
      if (emailExist) {
        return res.status(400).json({
          message: "Oops, email already exists",
        });
      }
      const convertedEmail = email.trim().toLowerCase();
      const passwordEncoded = await HashPassword(password);
      if (!userName) {
        return res.status(400).send({
            message: "Username is required",
        });
    }
  
      const newUser = await User.create({
        id: userId,
        userName,
        email: convertedEmail,
        password: passwordEncoded,
      });
  
      // Checking if the user exists
      const existUser = (await User.findOne({ where: { email: convertedEmail } })) as unknown as UserAttribute;
      if (existUser) {
        return res.status(200).json({
          method: req.method,
          status: "Successful",
          message: "User created successfully",
          user: existUser,
        });
      }
    } catch (error) {
      console.error(error); // Log the error to the console
      res.status(500).json({
        status: "Error",
        message: "Oops, an error occurred, failed to create a user",
      });
    }
  };