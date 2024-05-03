import { BlogRepository } from "../repositories/blog";
import type {
  TBlogIdValidation,
  TBlogUpdateValidation,
  TBlogValidation,
} from "../types";

export class BlogController {
  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }

  async createBlog(req: TBlogValidation) {
    try {
      const blogRes = await new BlogRepository().createBlog(req, this.userId);
      if (!blogRes) {
        return {
          success: false,
          message: "something went wrong",
        };
      }

      return {
        success: true,
        data: blogRes,
        message: "Blog published successfully",
      };
    } catch (e: any) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async updateBlog(req: TBlogUpdateValidation) {
    try {
      const updatedBlogRes = await new BlogRepository().updateBlog(
        req,
        this.userId
      );

      return {
        success: true,
        message: "Blog updated successfully",
        data: updatedBlogRes,
      };
    } catch (e: any) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async getBlog(req: TBlogIdValidation) {
    try {
      const blogRes = await new BlogRepository().getBlog(req, this.userId);
      if (!blogRes) {
        return {
          success: false,
          message: "Unable to fetch blog",
        };
      }

      return {
        success: true,
        message: "Blog found successfully",
        data: blogRes,
      };
    } catch (e: any) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  static async getAllBlogs() {
    try {
      const blogs = await new BlogRepository().getAllBlogs();

      return { success: true, data: blogs };
    } catch (e: any) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
