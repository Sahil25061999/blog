import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {});

router.put("/", (req, res) => {});

router.get("/:id", (req, res) => {
  res.send("hello blog "+req.headers.userId)
});

router.get("/bulk", (req, res) => {});

export default router;
