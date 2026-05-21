import prisma from "../../config/prisma";

interface CreateCommentInput {
  message: string;
  userId: string;
  ticketId: string;
}

export const createComment = async (data: CreateCommentInput) => {
  return prisma.comment.create({
    data,
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
  });
};

export const getTicketComments = async (ticketId: string) => {
  return prisma.comment.findMany({
    where: {
      ticketId,
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
      createdAt: "asc",
    },
  });
};
