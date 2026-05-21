import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import catchAsync from "../../utils/catchAsync";

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});
