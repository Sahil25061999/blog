import { Router } from "express";
import userRouter from "./user";
import blogRouter from "./blog";

const router = Router();

router.use("/user", userRouter);
router.use("/blog", blogRouter);

export default router;
