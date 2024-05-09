import { UserRepositories } from "../repositories/user";
import { type TSignInValidation, type TSignUpValidation } from "@sahil2506/blog-types";
import { generateHashedPassword, generateToken, verifyPassword } from "../utils";

export class UserController {
  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
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
      const token = generateToken(user);
      return {
        success: true,
        message: "User profile created successfully",
        data: { user, token },
      };
    } catch (e: any) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  static async verifyUser(req: TSignInValidation) {
    try {
      const userExist = await UserRepositories.getUserByEmail(req.email);
      if (!userExist) {
        return {
          success: false,
          message: "verify email and try again",
        };
      }
      const validPassword = verifyPassword(req.password, userExist.password);
      if (!validPassword) {
        return {
          success: false,
          message: "verify email or password and try again",
        };
      }
      const token = generateToken({
        username: userExist.username,
        email: userExist.email,
      });
      return {
        success: true,
        message: "User Signed In successfully",
        data: { token },
      };
    } catch (e: any) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async getUser() {
    try {
      const user = await UserRepositories.getUserById(this.userId);
      if (!user) {
        return {
          success: false,
          message: "No user found",
        };
      }
      return {
        success: true,
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
