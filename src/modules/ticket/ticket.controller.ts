import { Response, Request } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import {
  createTicket,
  getAllTickets,
  updateTicketStatus,
} from "./ticket.service";
import catchAsync from "../../utils/catchAsync";
import { Role, TicketStatus } from "@prisma/client";

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
    const tickets = await getAllTickets({
      userId: req.user.id,
      role: req.user.role,

      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,

      search: req.query.search as string,

      status: req.query.status as TicketStatus,

      userRole: req.query.userRole as Role,

      sortBy: req.query.sortBy as string,

      sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
    });
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
