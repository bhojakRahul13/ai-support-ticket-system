import { Response, Request } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import {
  createTicket,
  getAllTickets,
  updateTicketStatus,
} from "./ticket.service";
import catchAsync from "../../utils/catchAsync";

export const create = catchAsync(async (req: AuthRequest, res: Response) => {
  const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const ticket = await createTicket({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id,
    attachmentUrl,
  });

  res.status(201).json({
    success: true,
    message: "Ticket created successfully",
    data: ticket,
  });
});

export const getTickets = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const tickets = await getAllTickets(req.user.id, req.user.role);
    res.status(200).json({
      success: true,
      data: tickets,
    });
  },
);

export const updateStatus = catchAsync(
  async (req: AuthRequest & Request<{ id: string }>, res: Response) => {
    const ticket = await updateTicketStatus(req.params.id, req.body.status);

    res.status(200).json({
      success: true,
      message: "Ticket status updated",
      data: ticket,
    });
  },
);
