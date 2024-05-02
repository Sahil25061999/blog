import bcrypt, { hash } from "bcryptjs";
import { UserRepositories } from "../repositories/user";
import { type TSignUpValidation } from "../types";
import { generateHashedPassword } from "../utils";

export class UserController {
  static async createUser(req: TSignUpValidation) {
    try {
      const userExist = await UserRepositories.getUserByEmail(req.email);
      if (userExist) {
        return {
          success: false,
          message: "user already exist",
        };
      }
      const hashedPassword = generateHashedPassword(req.password);
      const data = {
        ...req,
        password: hashedPassword,
      };
      const user = await UserRepositories.createUser(data);
      return {
        success: true,
        message: "User profile created successfully",
        data: user,
      };
    } catch (e: any) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
