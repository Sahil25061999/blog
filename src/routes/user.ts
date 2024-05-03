import { Router } from "express";
import { UserController } from "../controller/user";
import { signinValidation, signupValidation } from "@sahil2506/blog-types";
import { validateRequestMiddleware } from "../middleware";

const router = Router();

router.post(
  "/signup",
  validateRequestMiddleware(signupValidation, "body"),
  async (req, res) => {
    try {
      const signupRes = await UserController.createUser(req.body);
      if (!signupRes.success) {
        return res.status(422).json(signupRes);
      }

      res.status(200).json(signupRes);
    } catch (e: any) {
      return res.status(422).json({
        success: false,
        message: e.message,
      });
    }
  }
);

router.post(
  "/signin",
  validateRequestMiddleware(signinValidation, "body"),
  async (req, res) => {
    try {
      const signinRes = await UserController.verifyUser(req.body);
      if (!signinRes.success) {
        return res.status(422).json(signinRes);
      }

      res.status(200).json(signinRes);
    } catch (e: any) {
      return res.status(422).json({
        success: false,
        message: e.message,
      });
    }
  }
);

export default router;
