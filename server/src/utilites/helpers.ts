import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken"

export const APP_SECRET = process.env.APP_SECRET
export const GenerateToken =(payload:any) =>{
    return jwt.sign(payload, `${APP_SECRET}`!, {expiresIn : "1d"})
}

export const HashPassword = async(password:string) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export const isValidEmail = async (email: any) => {
    // Basic email format validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  export const isValidDate = async (date: any) => {
    // Basic date format validation (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  }


