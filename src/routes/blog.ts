import { Router } from "express";
import {
  validateRequestMiddleware,
  validateUserMiddleware,
} from "../middleware";
import {
  blogIdValidation,
  blogUpdateValidation,
  blogValidation,
  type TBlogIdValidation,
} from "@sahil2506/blog-types";
import { BlogController } from "../controller/blog";

const router = Router();

const protectedRouter = router.route("/").all(validateUserMiddleware);

protectedRouter.get((req, res) => {
  res.send("hello from get");
});

protectedRouter.post(
  validateRequestMiddleware(blogValidation, "body"),
  async (req, res) => {
    try {
      const blogRes = await new BlogController(
        req.headers.userId as string
      ).createBlog(req.body);

      if (!blogRes.success) {
        return res.status(403).json(blogRes);
      }

      return res.status(200).json(blogRes);
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        message: e.message,
      });
    }
  }
);

protectedRouter.put(
  validateRequestMiddleware(blogUpdateValidation, "body"),
  async (req, res) => {
    try {
      const blogUpdateRes = await new BlogController(
        req.headers.userId as string
      ).updateBlog(req.body);
      if (!blogUpdateRes.success) {
        res.status(422).json(blogUpdateRes);
      } else {
        res.status(200).json(blogUpdateRes);
      }
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        message: e.message,
      });
    }
  }
);

router.get("/bulk", async (req, res) => {
  try {
    const blogs = await BlogController.getAllBlogs();

    return res.status(200).json(blogs);
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
});

router.get(
  "/:id",
  validateUserMiddleware,
  validateRequestMiddleware(blogIdValidation, "params"),
  async (req, res) => {
    try {
      const blog = await new BlogController(
        req.headers.userId as string
      ).getBlog(req.params as TBlogIdValidation);
      if (!blog.success) {
        return res.status(422).json(blog);
      }

      return res.status(200).json(blog);
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        message: e.message,
      });
    }
  }
);

export default router;
