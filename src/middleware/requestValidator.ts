import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";

export const validateRequestMiddleware = (schema: z.ZodTypeAny, param: string) => {
  return (
    req: Request<{}, string, any, Record<string, any>>,
    res: Response,
    next: NextFunction
  ) => {
    const { success, data } = schema.safeParse((req as any)[param]);
    if (!success) {
      return res.status(422).json({
        success: false,
        data,
        message: "Invalid params",
      });
    }
    next();
  };
};
