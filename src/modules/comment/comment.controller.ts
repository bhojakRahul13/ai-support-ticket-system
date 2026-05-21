import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { createComment, getTicketComments } from "./comment.service";
import { io } from "../../server";
import catchAsync from "../../utils/catchAsync";

export const create = catchAsync(async (req: AuthRequest, res: Response) => {
  const comment = await createComment({
    message: req.body.message,
    userId: req.user.id,
    ticketId: req.params.ticketId as string,
  });

  io.to(comment.ticketId).emit("new-comment", comment);
  res.status(201).json({
    success: true,
    message: "Comment added",
    data: comment,
  });
});

export const getComments = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const comments = await getTicketComments(req.params.ticketId as string);

    res.status(200).json({
      success: true,
      data: comments,
    });
  },
);
