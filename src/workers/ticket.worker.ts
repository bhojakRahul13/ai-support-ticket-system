import { Worker } from "bullmq";
import redisConnection from "../config/redis";
import prisma from "../config/prisma";
import { generateTicketSummary } from "../modules/ai/ai.service";

const ticketWorker = new Worker(
  "ticket-ai-processing",

  async (job) => {
    const { ticketId, title, description } = job.data;

    const aiSummary = await generateTicketSummary(title, description);

    await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        aiSummary,
      },
    });

    console.log("AI summary updated:", ticketId);
  },

  {
    connection: redisConnection,
  },
);

export default ticketWorker;
