import prisma from "../../config/prisma";
import { generateTicketSummary } from "../ai/ai.service";
import { ticketQueue } from "../../queues/ticket.queue";
import { Prisma, Role, TicketStatus } from "@prisma/client";

interface CreateTicketInput {
  title: string;
  description: string;
  userId: string;
  attachmentUrl?: string | null;
}

interface GetTicketsParams {
  userId: string;
  role: Role;

  page?: number;
  limit?: number;

  search?: string;

  status?: TicketStatus;
  userRole?: Role;

  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const createTicket = async (data: CreateTicketInput) => {
  const aiSummary = await generateTicketSummary(data.title, data.description);

  const ticket = await prisma.ticket.create({
    data: {
      ...data,
      aiSummary: aiSummary || null,
    },
  });

  return ticket;
};

// export const createTicket = async (data: CreateTicketInput) => {
//   const ticket = await prisma.ticket.create({
//     data,
//   });

// await ticketQueue.add("generate-summary", {
//   ticketId: ticket.id,
//   title: ticket.title,
//   description: ticket.description,
// });

//   return ticket;
// };

export const getAllTickets = async ({
  userId,
  role,

  page = 1,
  limit = 10,

  search = "",

  status,
  userRole,

  sortBy = "createdAt",
  sortOrder = "desc",
}: GetTicketsParams) => {
  const skip = (page - 1) * limit;

  const where: Prisma.TicketWhereInput = {};

  // USER can only see own tickets
  if (role !== "ADMIN") {
    where.userId = userId;
  }

  const validStatuses = ["OPEN", "IN_PROGRESS", "CLOSED"];

  // STATUS FILTER
  if (status) {
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status. Allowed: OPEN, IN_PROGRESS, CLOSED");
    }

    where.status = status as TicketStatus;
  }

  // USER ROLE FILTER
  if (userRole) {
    where.user = {
      role: userRole,
    };
  }

  // SEARCH
  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        user: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },

      {
        user: {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  const allowedSortFields = ["createdAt", "updatedAt", "title", "status"];

  const finalSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },

        _count: {
          select: {
            comments: true,
          },
        },
      },
      skip,
      take: limit,

      orderBy: {
        [finalSortBy]: sortOrder,
      },
    }),

    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    data: tickets,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateTicketStatus = async (ticketId: string, status: string) => {
  const updatedTicket = await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: status as any,
    },
  });

  return updatedTicket;
};
