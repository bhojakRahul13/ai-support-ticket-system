import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authMiddleware, { AuthRequest } from "./middleware/auth.middleware";
import authRoutes from "./modules/auth/auth.routes";
import ticketRoutes from "./modules/ticket/ticket.routes";
import commentRoutes from "./modules/comment/comment.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/uploads", express.static("uploads"));

app.get("/", async (req, res) => {
  res.json({
    message: "AI Support Ticket System API Running...",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/comments", commentRoutes);

app.get("/api/health", async (req: AuthRequest, res) => {
  res.json({
    success: true,
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use(globalErrorHandler);

export default app;
