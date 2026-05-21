import prisma from "../../config/prisma";
import { generateTicketSummary } from "../ai/ai.service";
import { ticketQueue } from "../../queues/ticket.queue";

interface CreateTicketInput {
  title: string;
  description: string;
  userId: string;
  attachmentUrl?: string | null;
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

export const getAllTickets = async (userId: string, role: string) => {
  if (role === "ADMIN") {
    return prisma.ticket.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return prisma.ticket.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
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
