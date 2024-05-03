import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils";
import { UserRepositories } from "../repositories/user";
import type { TSignInValidation } from "@sahil2506/blog-types";

export const validateUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (!token) {
      return res.status(422).json({
        success: false,
        message: "Unable to process request",
      });
    }
    const data = verifyToken(token) as TSignInValidation;
    const userId = await UserRepositories.getUserByEmail(data.email).then(
      (res) => res?.id
    );
    req.headers.userId = userId;
    next();
  } catch (e: any) {
    res.status(403).json({
      success: false,
      message: e.message,
    });
  }
};
