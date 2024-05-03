import { PrismaClient } from "@prisma/client";
import type {
  TBlogIdValidation,
  TBlogUpdateValidation,
  TBlogValidation,
} from "@sahil2506/blog-types";
const prisma = new PrismaClient();

export class BlogRepository {
  async createBlog(data: TBlogValidation, userId: string) {
    try {
      const blog = prisma.post.create({
        data: {
          ...data,
          authorId: userId,
          published: true,
        },
        select: {
          title: true,
          published: true,
          id: true,
        },
      });

      return blog;
    } catch (e) {
      throw e;
    }
  }

  async updateBlog(data: TBlogUpdateValidation, userId: string) {
    try {
      const updatedBlog = await prisma.post.update({
        data: {
          title: data.title,
          content: data.content,
        },
        where: {
          id: data.blogId,
        },
        select: {
          title: true,
        },
      });

      return updatedBlog;
    } catch (e) {
      throw e;
    }
  }

  async getBlog(blogId: TBlogIdValidation, userId: string) {
    try {
      const blog = await prisma.post.findFirst({
        where: {
          id: blogId.id,
        },
      });
      return blog;
    } catch (e: any) {
      throw e;
    }
  }

  async getAllBlogs() {
    try {
      const blogs = await prisma.post.findMany({
        select: {
          title: true,
          content: true,
        },
      });
      
      return blogs;
    } catch (e) {
      throw e;
    }
  }
}
