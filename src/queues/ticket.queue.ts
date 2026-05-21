import { Queue } from "bullmq";
import redisConnection from "../config/redis";

export const ticketQueue = new Queue(
  "ticket-ai-processing",
  {
    connection: redisConnection,
  }
);