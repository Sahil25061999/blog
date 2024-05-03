import { z } from "zod";

export const blogValidation = z.object({
  title: z.string(),
  content: z.string(),
});

export const blogUpdateValidation = blogValidation.extend({
  blogId: z.string(),
});

export const blogIdValidation = z.object({
  id: z.string(),
});

export type TBlogValidation = z.infer<typeof blogValidation>;
export type TBlogUpdateValidation = z.infer<typeof blogUpdateValidation>;
export type TBlogIdValidation = z.infer<typeof blogIdValidation>;
