import { NextFunction, Request, Response } from "express";

import { z, ZodError } from "zod";

const validateRequest = (schema: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,

          errors: err.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};

export default validateRequest;
