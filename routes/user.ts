import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { z } from "zod";
import { UserController } from "../controller/user";
import { signupValidation } from "../types";

const router = Router();

const validateRequest = (schema: z.ZodTypeAny, param: string) => {
  return (
    req: Request<{}, string, any, Record<string, any>>,
    res: Response,
    next: NextFunction
  ) => {
    const { success } = schema.safeParse((req as any)[param]);
    if (success) next();
    return res.status(422).json({
      success: false,
      message: "Invalid params",
    });
  };
};

router.post(
  "/signup",
  validateRequest(signupValidation, "body"),
  async (req, res) => {
    try {
      const userRes = await UserController.createUser(req.body);

      return res.status(200).json(userRes);
    } catch (e:any) {

      return res.status(422).json({
        success: false,
        message: e.message,
      });
    }
  }
);

router.post("/signin", (req, res) => {});

export default router;
